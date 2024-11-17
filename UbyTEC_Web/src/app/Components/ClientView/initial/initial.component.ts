import { Component } from '@angular/core';
import { ShopsComponent } from '../shops/shops/shops.component';
import { LastOrdersComponent } from '../lastOrders/lastOrders/last-orders/last-orders.component';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [ShopsComponent, LastOrdersComponent],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {

}
