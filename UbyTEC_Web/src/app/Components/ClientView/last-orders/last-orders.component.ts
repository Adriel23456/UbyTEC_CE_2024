import { Component } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { OrderService } from '../../../Services/Order/order.service';
import { FeedBackService } from '../../../Services/FeedBack/feed-back.service';
import { ProductService } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { ExtrasService } from '../../../Services/Extras/extras.service';
import { ClientService } from '../../../Services/Client/client.service';

@Component({
  selector: 'app-last-orders',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './last-orders.component.html',
  styleUrl: './last-orders.component.css'
})
export class LastOrdersComponent {
  lastOrders: { total: number|null|undefined, feedbackB: string, feedbackO: string, feedbackD: string, businessAName: string}[] = [];
  currentClientId: number = 0;

  constructor(
    private orderService: OrderService,
    private feedBackService: FeedBackService,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private extrasService: ExtrasService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.clientService.getAll().subscribe(clients => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        this.currentClientId = currentClient.Id;
      }
  
      this.extrasService.getLast10OrdersByClient(this.currentClientId).subscribe(lastOrdersTotal => {
        this.lastOrders = [];
  
        // Iteramos sobre las órdenes y obtenemos el nombre del comercio
        lastOrdersTotal.forEach(order => {
          this.orderService.getProductsByCode(order.Code).subscribe(products => {
            // Filtramos el producto que coincide con el código de la orden
            const product = products.find(p => p.Order_Code === order.Code);
            if (product) {
              const productCode = product.Product_Code;
  
              // Obtenemos el producto completo usando el Product_Code
              this.productService.getByCode(productCode).subscribe(fullProduct => {
                const legalId = fullProduct.BusinessAssociate_Legal_Id;
                
                // Obtenemos el comercio usando el BusinessAssociate_Legal_Id
                this.businessAssociateService.getByLegalId(legalId).subscribe(businessAssociate => {
                  
 
                  this.feedBackService.getById(order.Code).subscribe(feedback => {
                   
                    this.lastOrders.push({
                      total: order.TotalService,
                      feedbackB: feedback.FeedBack_Business, 
                      feedbackO: feedback.FeedBack_Order, 
                      feedbackD: feedback.FeedBack_DeliveryMan, 
                      businessAName: businessAssociate.BusinessName
                    });
                  });
                });
              });
            }
          });
        });
      });
    });
  }
}
