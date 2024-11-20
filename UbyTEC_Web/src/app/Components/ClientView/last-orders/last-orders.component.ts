import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
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
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentClientId = currentClient.Id;
    // Obtener todos los feedbacks primero
    this.feedBackService.getAll().subscribe(allFeedbacks => {
      this.extrasService.getLast10OrdersByClient(this.currentClientId).subscribe(lastOrdersTotal => {
        this.lastOrders = [];
        
        lastOrdersTotal.forEach(order => {
          this.orderService.getProductsByCode(order.Code).subscribe(products => {
            const product = products.find(p => p.Order_Code === order.Code);
            if (product) {
              const productCode = product.Product_Code;
              this.productService.getByCode(productCode).subscribe(fullProduct => {
                const legalId = fullProduct.BusinessAssociate_Legal_Id;
                this.businessAssociateService.getByLegalId(legalId).subscribe(businessAssociate => {
                  // Buscar el feedback correspondiente a esta orden
                  const feedback = allFeedbacks.find(f => f.Order_Code === order.Code);
                  if (feedback) {
                    this.lastOrders.push({
                      total: order.TotalService,
                      feedbackB: feedback.FeedBack_Business,
                      feedbackO: feedback.FeedBack_Order,
                      feedbackD: feedback.FeedBack_DeliveryMan,
                      businessAName: businessAssociate.BusinessName
                    });
                  }
                });
              });
            }
          });
        });
      });
    });
  }
}
