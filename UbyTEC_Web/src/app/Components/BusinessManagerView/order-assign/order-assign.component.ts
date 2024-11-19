import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtrasService } from '../../../Services/Extras/extras.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { ClientService, Client } from '../../../Services/Client/client.service'; // Importar ClientService
import { OrderService, Order, OrderProduct } from '../../../Services/Order/order.service'; // Importar OrderService
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component'; // Asegúrate de que la ruta sea correcta
import { merge, of, forkJoin } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith, switchMap, tap, map } from 'rxjs/operators';
import { Product, ProductService } from '../../../Services/Product/product.service';
import { PrincipalService } from '../../../Services/Principal/principal.service';

@Component({
  selector: 'app-order-assign',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-assign.component.html',
  styleUrls: ['./order-assign.component.css']
})
export class OrderAssignComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Code', 'ClientName', 'State', 'Assign'];
  data: Order[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  filterControl = new FormControl('');

  businessId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Mapa para almacenar los clientes y evitar solicitudes redundantes
  clientsMap: Map<number, Client> = new Map();

  constructor(
    private extrasService: ExtrasService,
    private principalService: PrincipalService,
    private businessAssociateService: BusinessAssociateService,
    private businessManagerService: BusinessManagerService,
    private clientService: ClientService, // Inyectar ClientService
    private orderService: OrderService, // Inyectar OrderService
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // 1. Verificar autenticación
    const currentBusinessAssociate = this.businessAssociateService.currentBusinessAssociateValue;
    const currentBusinessManager = this.businessManagerService.currentBusinessManagerValue;

    if (!currentBusinessAssociate || !currentBusinessManager) {
      this.openDialog('Error', 'No hay negocio o administrador autenticado. Por favor, inicie sesión nuevamente.')
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }

    // 2. Obtener el ID del negocio actual
    this.businessId = currentBusinessAssociate.Legal_Id;
  }

  ngAfterViewInit(): void {
    // 3. Inicializar el paginador y el filtro
    merge(this.paginator.page, this.filterControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ))
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        const filterValue = this.getFilterValue();

        if (filterValue !== null) {
          // Filtro no está vacío, usar el método con filtro
          return this.extrasService.getOrdersByClientNameAndBusinessAndState(this.businessId, filterValue)
            .pipe(
              catchError(() => {
                this.isRateLimitReached = true;
                this.isLoadingResults = false;
                return of([]);
              })
            );
        } else {
          // Filtro está vacío, usar getAll() y filtrar según businessId y state a través de Products
          return this.orderService.getAll().pipe(
            switchMap((orders: Order[]) => {
              // Filtrar órdenes con State === 'Listo para envio'
              const filteredOrders = orders.filter(order => order.State === 'Listo para envio');

              // Para cada orden, verificar si está asociada al businessId a través de sus productos
              const matchingOrders$ = filteredOrders.map(order => {
                return this.orderService.getProductsByCode(order.Code).pipe(
                  switchMap((orderProducts: OrderProduct[]) => {
                    if (!orderProducts || orderProducts.length === 0) {
                      return of(null); // No hay productos, excluir la orden
                    }

                    // Obtener todos los productos asociados a esta orden
                    const productObservables = orderProducts.map(op => this.productService.getByCode(op.Product_Code));

                    return forkJoin(productObservables).pipe(
                      map((products: Product[]) => {
                        // Verificar si alguno de los productos tiene BusinessAssociate_Legal_Id igual al businessId
                        const hasMatchingProduct = products.some(product => product.BusinessAssociate_Legal_Id === this.businessId);
                        return hasMatchingProduct ? order : null;
                      }),
                      catchError(() => of(null)) // En caso de error, excluir la orden
                    );
                  }),
                  catchError(() => of(null)) // En caso de error en getProductsByCode, excluir la orden
                );
              });
              // Esperar a que todas las verificaciones se completen
              return forkJoin(matchingOrders$).pipe(
                map((results: (Order | null)[]) => results.filter(order => order !== null) as Order[])
              );
            }),
            catchError(() => {
              this.isRateLimitReached = true;
              this.isLoadingResults = false;
              return of([]);
            })
          );
        }
      }),
      switchMap((orders: Order[]) => {
        this.data = orders;
        this.resultsLength = orders.length;

        // Obtener los IDs únicos de los clientes para cargar sus nombres
        const clientIds = Array.from(new Set(orders.map(order => order.Client_Id)));
        const missingClientIds = clientIds.filter(id => !this.clientsMap.has(id));

        if (missingClientIds.length > 0) {
          const clientObservables = missingClientIds.map(id => this.clientService.getById(id));
          return forkJoin(clientObservables).pipe(
            tap((clients: Client[]) => {
              clients.forEach(client => {
                this.clientsMap.set(client.Id, client);
              });
              this.isLoadingResults = false;
            }),
            catchError(() => {
              this.isRateLimitReached = true;
              this.isLoadingResults = false;
              return of([]);
            })
          );
        } else {
          this.isLoadingResults = false;
          return of([]);
        }
      })
    )
    .subscribe({
      next: () => {
        // No acción adicional necesaria aquí
      },
      error: () => {
        this.isRateLimitReached = true;
        this.isLoadingResults = false;
      }
    });
  }

  /**
   * Función auxiliar para obtener el valor del filtro.
   * Retorna `null` si el filtro está vacío o contiene solo espacios.
   * @returns Valor del filtro o `null`.
   */
  private getFilterValue(): string | null {
    const value = this.filterControl.value;
    if (value && value.trim() !== '') {
      return value.trim();
    }
    return null;
  }

  /**
   * Obtiene el nombre completo del cliente basado en Client_Id.
   * @param clientId ID del cliente.
   * @returns Nombre completo del cliente o 'N/A' si no se encuentra.
   */
  getClientFullName(clientId: number): string {
    const client = this.clientsMap.get(clientId);
    if (client) {
      return `${client.FullName}`;
    }
    return 'N/A';
  }

  /**
     * Asigna un repartidor a una orden.
     * @param order La orden a la cual se le asignará un repartidor.
   */
  assignDeliveryMan(order: Order): void {
    // Llamar al servicio para asignar la orden a un repartidor
    this.principalService.assignOrderToDeliveryMan(order.Code).subscribe({
      next: () => {
        this.openDialog('Éxito', `Repartidor asignado exitosamente, la orden ${order.Code} está ahora en el estado 'En camino'.`)
          .afterClosed()
          .subscribe(() => {
            location.reload();
          });
      },
      error: (error) => {
        const errorMessage = error.message;
        if(errorMessage.toLowerCase().includes('post assign order')){
          // Abrir un diálogo de éxito con el mensaje correspondiente
          this.openDialog('Éxito', `Repartidor asignado exitosamente, la orden ${order.Code} está ahora en el estado 'En camino'.`)
          .afterClosed()
          .subscribe(() => {
            location.reload();
          });
        }else{
          // Manejar el error y mostrar un diálogo de error
          this.openDialog(
            'Error',
            `Hubo un problema al asignar el repartidor a la orden ${order.Code}. Por favor, intenta nuevamente.`
          );
        }
      }
    });
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}