import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ClientService } from '../../../Services/Client/client.service';
import { forkJoin, map } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, OrderUpdate } from '../../../Services/Order/order.service';
import { ProofOfPaymentService } from '../../../Services/ProofOfPayment/proof-of-payment.service';
import { ProductService } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { switchMap } from 'rxjs';
import { FoodDeliveryManService } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { ReceiveFeedBackComponent } from '../receive-feed-back/receive-feed-back.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-order-reception',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './order-reception.component.html',
  styleUrl: './order-reception.component.css'
})
export class OrderReceptionComponent {
  displayedColumns: string[] = ['position', 'BusinessName', 'Amount', 'Date', 'State', 'Cancel', 'Complete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private proofOfPaymentService: ProofOfPaymentService,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private foodDeliveryManService: FoodDeliveryManService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(orders => {
      const inProgressOrders = orders.filter(order => order.State === 'En camino');

      const orderObservables = inProgressOrders.map(order => {
        const products$ = this.orderService.getProductsByCode(order.Code);
        const proofOfPayment$ = this.proofOfPaymentService.getAll().pipe(
          map(payments => payments.find(payment => payment.Order_Code === order.Code))
        );

        return forkJoin({ products: products$, proofOfPayment: proofOfPayment$ }).pipe(
          map(({ products, proofOfPayment }) => ({ order, products, proofOfPayment }))
        );
      });

      forkJoin(orderObservables).subscribe(orderDetails => {
        const newData = orderDetails.map(detail => {
          const { order, products, proofOfPayment } = detail;
        
          // Calculando el monto total
          const totalAmount = products.reduce((sum, product) => sum + (product.Amount || 0), 0);
        
          // Obteniendo los IDs de los asociados de negocio
          const businessIds = [...new Set(products.map(p => p.Product_Code))];
          
          return this.productService.getAll().pipe(
            switchMap(productsList => {
              const businessAssociates = businessIds.map(id =>
                productsList.find(p => p.Code === id)?.BusinessAssociate_Legal_Id
              );
        
              return this.businessAssociateService.getByLegalId(Number(businessAssociates[0])).pipe(
                map(business => {
                  return {
                    order,
                    totalAmount,
                    business, 
                    proofOfPayment
                  };
                })
              );
            })
          );
        });
        
        forkJoin(newData).subscribe(finalData => {
          this.dataSource.data = finalData.map((data, index) => {
            return {
              position: index + 1,
              BusinessName: data.business.BusinessName,
              BusinessId: data.business.Legal_Id,
              Amount: data.totalAmount,
              Date: data.proofOfPayment?.Date,
              State: data.order.State,
              Code: data.order.Code,
              DM_Id: data.order.FoodDeliveryMan_UserId
            };
          });
          this.dataSource.paginator = this.paginator;
        });
        
        
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  completeOrder(OCode: number, DM_Id: string, BusinessId:number): void {
    this.clientService.getAll().subscribe(clients => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        const updatedOrder: OrderUpdate = {
          State: 'Finalizado', 
          Client_Id: currentClient.Id,
          FoodDeliveryMan_UserId: DM_Id,
        };
  
        // Actualizar la orden primero
        this.orderService.update(OCode, updatedOrder).subscribe({
          next: () => {
            // Después actualizar el estado del repartidor a "Disponible"
            this.foodDeliveryManService.getByUserId(DM_Id).subscribe(deliveryMan => {
              const updatedDeliveryMan = { ...deliveryMan, State: 'Disponible' };
              this.foodDeliveryManService.update(DM_Id, updatedDeliveryMan).subscribe(() => {
                this.snackBar.open('La orden ha sido completada correctamente .', 'Cerrar', {
                  duration: 3000,
                });
                
                const dialogRef = this.dialog.open(ReceiveFeedBackComponent, {
                  width: '90%',
                  data: {
                    Order_Code: OCode,
                    BusinessAssociate_Legal_Id: BusinessId,
                    FoodDeliveryMan_UserId: DM_Id,
                  }
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.loadOrders();
                  }
                });
              });
            });
          },
        });
      }
    });
  }

  cancelOrder(OCode: number, DM_Id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmar Cancelación',
        message: '¿Estás seguro de que deseas cancelar esta Orden?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.clientService.getAll().subscribe(clients => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        const updatedOrder: OrderUpdate = {
          State: 'Cancelado', 
          Client_Id: currentClient.Id,
          FoodDeliveryMan_UserId: DM_Id,
        };
  
        // Actualizar la orden primero
        this.orderService.update(OCode, updatedOrder).subscribe({
          next: () => {
            // Después actualizar el estado del repartidor a "Disponible"
            this.foodDeliveryManService.getByUserId(DM_Id).subscribe(deliveryMan => {
              const updatedDeliveryMan = { ...deliveryMan, State: 'Disponible' };
              this.foodDeliveryManService.update(DM_Id, updatedDeliveryMan).subscribe(() => {
                this.snackBar.open('La orden ha sido cancelada', 'Cerrar', {
                  duration: 3000,
                });
                // Actualiza la tabla o recarga los datos
                this.loadOrders();
              });
            });
          },
        });
      }
    });}
  });
  }
}
