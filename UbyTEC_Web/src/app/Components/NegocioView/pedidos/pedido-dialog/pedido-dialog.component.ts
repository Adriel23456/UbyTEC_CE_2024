import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';

@Component({
  selector: 'app-pedido-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './pedido-dialog.component.html',
  styleUrl: './pedido-dialog.component.css'
})
export class PedidoDialogComponent {
  
}
