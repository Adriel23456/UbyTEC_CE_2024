import { Component, ViewChild } from '@angular/core';
import { PrincipalService } from '../../../Services/Principal/principal.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ClientService } from '../../../Services/Client/client.service';
import { forkJoin} from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, OrderUpdate } from '../../../Services/Order/order.service';
import { ProofOfPaymentService } from '../../../Services/ProofOfPayment/proof-of-payment.service';
import { ProductService } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { FoodDeliveryManService } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { ReceiveFeedBackComponent } from '../receive-feed-back/receive-feed-back.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';
import { FeedBackCreate, FeedBackService } from '../../../Services/FeedBack/feed-back.service';

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
  currentClientId: number = 0;
  inProgressOrderCodes: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private proofOfPaymentService: ProofOfPaymentService,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private foodDeliveryManService: FoodDeliveryManService,
    private principalService: PrincipalService,
    private feedBackService: FeedBackService
  ) {}

  ngOnInit(): void {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentClientId = currentClient.Id;
    this.loadOrders();
  }

  private async getBusinessInfo(productCode: number): Promise<{ businessId: number, businessName: string }> {
    try {
        const product = await this.productService.getByCode(productCode).toPromise();
        if (!product) {
            throw new Error('Product not found');
        }
        const business = await this.businessAssociateService.getByLegalId(product.BusinessAssociate_Legal_Id).toPromise();
        if (!business) {
            throw new Error('Business not found'); 
        }
        return {
            businessId: business.Legal_Id,
            businessName: business.BusinessName
        };
    } catch (error) {
        console.error('Error getting business info:', error);
        return {
            businessId: 0,
            businessName: 'No disponible'
        };
    }
 }

  private loadOrders(): void {
    forkJoin({
      orders: this.orderService.getAll(),
      allProducts: this.orderService.getAllProducts(),
      payments: this.proofOfPaymentService.getAll()
    }).subscribe(async ({ orders, allProducts, payments }) => {
      const clientOrders = orders.filter(order => order.Client_Id === this.currentClientId);
      this.inProgressOrderCodes = clientOrders
        .filter(order => order.State === 'En camino')
        .map(order => order.Code);

      const orderData = await Promise.all(clientOrders.map(async order => {
        const orderProducts = allProducts.filter(p => p.Order_Code === order.Code);
        const totalAmount = orderProducts.reduce((sum, product) => sum + (product.Amount || 0), 0);
        const payment = payments.find(p => p.Order_Code === order.Code);
        
        const firstProduct = orderProducts[0];
        const businessInfo = firstProduct ? await this.getBusinessInfo(firstProduct.Product_Code) : { businessId: 0, businessName: 'No disponible' };

        return {
          position: 0,
          BusinessName: businessInfo.businessName,
          BusinessId: businessInfo.businessId,
          Amount: totalAmount,
          Date: payment?.Date || '',
          State: order.State,
          Code: order.Code,
          DM_Id: order.FoodDeliveryMan_UserId
        };
      }));

      // Ordenar por fecha más reciente
      const sortedData = this.sortOrdersByDate(orderData);
      this.dataSource.data = sortedData;
      this.dataSource.paginator = this.paginator;
    });
  }

  private sortOrdersByDate(orders: any[]): any[] {
    const today = new Date();
    const formatDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    return orders.sort((a, b) => {
      const dateA = formatDate(a.Date);
      const dateB = formatDate(b.Date);
      return Math.abs(dateA.getTime() - today.getTime()) - Math.abs(dateB.getTime() - today.getTime());
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancelOrder(orderCode: number): void {
    this.orderService.getByCode(orderCode).subscribe(order => {
      if (order.State === 'Finalizado' || order.State === 'Cancelado') {
        this.snackBar.open('Las órdenes finalizadas o canceladas no se pueden cancelar', 'Cerrar', { duration: 3000 });
        return;
      }
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: 'Confirmar Cancelación',
          message: '¿Estás seguro de que deseas cancelar esta Orden?'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (!result) return;
        const updatedOrder: OrderUpdate = {
          State: 'Cancelado',
          Client_Id: this.currentClientId,
          FoodDeliveryMan_UserId: order.FoodDeliveryMan_UserId
        };
        this.orderService.update(orderCode, updatedOrder).subscribe(() => {
          if (order.FoodDeliveryMan_UserId) {
            this.foodDeliveryManService.getByUserId(order.FoodDeliveryMan_UserId).subscribe(deliveryMan => {
              const updatedDeliveryMan = { ...deliveryMan, State: 'Disponible' };
              this.foodDeliveryManService.update(order.FoodDeliveryMan_UserId!, updatedDeliveryMan).subscribe(() => {
                this.snackBar.open('La orden ha sido cancelada', 'Cerrar', { duration: 3000 });
                this.loadOrders();
              });
            });
          }
        });
      });
    });
  }

  completeOrder(orderCode: number): void {
    if (!this.inProgressOrderCodes.includes(orderCode)) {
      this.snackBar.open('Este proceso es solo para órdenes en estado "En camino"', 'Cerrar', { duration: 3000 });
      return;
    }
    this.principalService.receiveOrderByClient(orderCode).subscribe({
      next: () => {
        this.processFeedbackAndDialog(orderCode);
      },
      error: (error) => {
        if (error.message.toLowerCase().includes('receive order')) {
          this.processFeedbackAndDialog(orderCode);
        } else {
          console.error('Error receiving order:', error);
          this.snackBar.open('Error al recibir la orden', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }

  private processFeedbackAndDialog(orderCode: number): void {
    this.orderService.getByCode(orderCode).subscribe(order => {
      const newFeedback: FeedBackCreate = {
        FeedBack_Business: "Todo perfecto",
        BusinessGrade: 5,
        FeedBack_Order: "Todo perfecto",
        OrderGrade: 5,
        FeedBack_DeliveryMan: "Todo perfecto",
        DeliveryManGrade: 5,
        FoodDeliveryMan_UserId: order.FoodDeliveryMan_UserId!,
        Order_Code: orderCode,
        BusinessAssociate_Legal_Id: this.dataSource.data.find(d => d.Code === orderCode)?.BusinessId
      };
      this.feedBackService.create(newFeedback).subscribe({
        next: (createdFeedback) => {
          const dialogRef = this.dialog.open(ReceiveFeedBackComponent, {
            width: '90%',
            data: {
              FeedBackId: createdFeedback.Id
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.loadOrders();
            } else {
              this.snackBar.open('Se genero un review predeterminado de la recepcion de esta orden', 'Cerrar', { duration: 3000 });
              this.loadOrders();
            }
          });
        },
        error: (error) => {
          console.error('Error creating feedback:', error);
          this.snackBar.open('Error al crear el feedback', 'Cerrar', { duration: 3000 });
        }
      });
    });
  }
}
