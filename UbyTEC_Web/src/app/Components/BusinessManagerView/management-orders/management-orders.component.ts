import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { merge, of, forkJoin } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith, switchMap, tap, map } from 'rxjs/operators';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { ClientService, Client } from '../../../Services/Client/client.service';
import { OrderService, Order, OrderProduct, OrderUpdate } from '../../../Services/Order/order.service';
import { ProductService, Product } from '../../../Services/Product/product.service';
import { DialogConfirmComponent } from '../../ClientView/dialog-confirm/dialog-confirm.component';
import { ExtrasService } from '../../../Services/Extras/extras.service';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-management-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './management-orders.component.html',
  styleUrls: ['./management-orders.component.css']
})
export class ManagementOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Code', 'ClientName', 'State', 'Actions'];
  dataSource = new MatTableDataSource<Order>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  filterControl = new FormControl('');
  stateFilterControl = new FormControl('Todos los estados');

  states = [
    'Todos los estados',
    'En camino',
    'Finalizado',
    'Preparando',
    'Cancelado',
    'Listo para envio'
  ];

  businessId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clientsMap: Map<number, Client> = new Map();

  constructor(
    private businessAssociateService: BusinessAssociateService,
    private businessManagerService: BusinessManagerService,
    private clientService: ClientService,
    private orderService: OrderService,
    private extrasService: ExtrasService,
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
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

    this.businessId = currentBusinessAssociate.Legal_Id;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
  }

  private loadData(): void {
    merge(
      this.paginator.page,
      this.filterControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.stateFilterControl.valueChanges
    )
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        const filterValue = this.filterControl.value?.trim() || '';
        const stateFilter = this.stateFilterControl.value;
  
        // Verificar si podemos usar la función optimizada
        if (filterValue !== '' && stateFilter && stateFilter !== 'Todos los estados') {
          return this.extrasService.getOrdersByClientNameBusinessAndStateFilter(
            this.businessId,
            filterValue,
            stateFilter
          ).pipe(
            map(orders => ({ orders, useOptimizedPath: true })),
            catchError(() => {
              this.isRateLimitReached = true;
              this.isLoadingResults = false;
              return of({ orders: [], useOptimizedPath: true });
            })
          );
        }
        // Si no se cumplen las condiciones, usar el flujo original
        return this.orderService.getAll().pipe(
          switchMap((orders: Order[]) => {
            const matchingOrders$ = orders.map(order => {
              return this.orderService.getProductsByCode(order.Code).pipe(
                switchMap((orderProducts: OrderProduct[]) => {
                  if (!orderProducts || orderProducts.length === 0) {
                    return of(null);
                  }
                  const firstProductObservable = this.productService.getByCode(orderProducts[0].Product_Code);
                  return firstProductObservable.pipe(
                    map((product: Product) => {
                      return product.BusinessAssociate_Legal_Id === this.businessId ? order : null;
                    }),
                    catchError(() => of(null))
                  );
                }),
                catchError(() => of(null))
              );
            });
            return forkJoin(matchingOrders$).pipe(
              map((results: (Order | null)[]) => ({
                orders: results.filter(order => order !== null) as Order[],
                useOptimizedPath: false
              }))
            );
          }),
          catchError(() => {
            this.isRateLimitReached = true;
            this.isLoadingResults = false;
            return of({ orders: [], useOptimizedPath: false });
          })
        );
      }),
      switchMap(({ orders, useOptimizedPath }) => {
        let filteredOrders = orders;
  
        // Solo aplicar filtros adicionales si no estamos usando la ruta optimizada
        if (!useOptimizedPath) {
          // Aplicar filtro por nombre de cliente
          const filterValue = this.filterControl.value?.toLowerCase().trim();
          if (filterValue) {
            filteredOrders = filteredOrders.filter(order => {
              const client = this.clientsMap.get(order.Client_Id);
              return client?.FullName.toLowerCase().includes(filterValue);
            });
          }
  
          // Aplicar filtro por estado
          const stateFilter = this.stateFilterControl.value;
          if (stateFilter && stateFilter !== 'Todos los estados') {
            filteredOrders = filteredOrders.filter(order => order.State === stateFilter);
          }
        }
  
        // Actualizar el dataSource
        this.dataSource.data = filteredOrders;
        this.resultsLength = filteredOrders.length;
  
        // Cargar información de clientes faltantes
        const clientIds = Array.from(new Set(filteredOrders.map(order => order.Client_Id)));
        const missingClientIds = clientIds.filter(id => !this.clientsMap.has(id));
  
        if (missingClientIds.length > 0) {
          const clientObservables = missingClientIds.map(id => this.clientService.getById(id));
          return forkJoin(clientObservables).pipe(
            tap((clients: Client[]) => {
              clients.forEach(client => {
                if (client) {
                  this.clientsMap.set(client.Id, client);
                }
              });
              this.isLoadingResults = false;
            }),
            catchError(() => {
              this.isRateLimitReached = true;
              this.isLoadingResults = false;
              return of([]);
            })
          );
        }
  
        this.isLoadingResults = false;
        return of([]);
      })
    ).subscribe({
      error: () => {
        this.isRateLimitReached = true;
        this.isLoadingResults = false;
      }
    });
  }

  getClientFullName(clientId: number): string {
    const client = this.clientsMap.get(clientId);
    return client ? client.FullName : 'N/A';
  }

  viewOrder(order: Order): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '99%',
      data: { orderCode: order.Code }
    });
  }

  changeToReadyForDelivery(order: Order): void {
    if (order.State === 'Preparando') {
      // Preparar el objeto de actualización
      const updateOrder: OrderUpdate = {
        State: 'Listo para envio',
        Client_Id: order.Client_Id,
        FoodDeliveryMan_UserId: order.FoodDeliveryMan_UserId
      };

      this.orderService.update(order.Code, updateOrder).subscribe({
        next: () => {
          this.openDialog('Éxito', `La orden ${order.Code} se cambió correctamente al estado de "Listo par envio"`)
            .afterClosed()
            .subscribe(() => {
              this.loadData(); // Recargar los datos
            });
        },
        error: (error) => {
          this.openDialog('Error', 'Hubo un error al actualizar el estado de la orden. Por favor, intente nuevamente.');
        }
      });
    } else {
      this.openDialog('Aviso', 'Esta funcionalidad solo está disponible para órdenes en estado "Preparando".');
    }
  }

  deleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro que desea eliminar la orden ${order.Code}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.delete(order.Code).subscribe({
          next: () => {
            this.openDialog('Éxito', `La orden ${order.Code} ha sido eliminada exitosamente`)
              .afterClosed()
              .subscribe(() => {
                this.loadData(); // Recargar los datos
              });
          },
          error: (error) => {
            this.openDialog('Error', 'Hubo un error al eliminar la orden. Por favor, intente nuevamente.');
          }
        });
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