import { Component } from '@angular/core';
import { ShopsComponent } from '../shops/shops.component';
import { LastOrdersComponent } from '../last-orders/last-orders.component';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [ShopsComponent, LastOrdersComponent],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {

}
