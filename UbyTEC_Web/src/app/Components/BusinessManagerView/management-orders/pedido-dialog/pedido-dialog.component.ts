import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';
import { OrderService, Order } from '../../../../Services/Order/order.service';
import { ProductosTableComponent } from '../productos-table/productos-table.component';

@Component({
  selector: 'app-pedido-dialog',
  standalone: true,
  imports: [MaterialModule, ProductosTableComponent],
  templateUrl: './pedido-dialog.component.html',
  styleUrl: './pedido-dialog.component.css',
})
export class PedidoDialogComponent {
  constructor(
    public service: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
