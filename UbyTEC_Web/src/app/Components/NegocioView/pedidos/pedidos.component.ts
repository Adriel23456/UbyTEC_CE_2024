import {Component} from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PedidoDialogComponent } from './pedido-dialog/pedido-dialog.component';

export interface pedidoArr {
  id: number,
  cliente: string,
  estado: string,
  listo: number,
}

const PEDIDO_DATA: pedidoArr[] = [
  {id: 1001, cliente: 'Benito Martínez', estado: 'Esperando', listo: 0},
];

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  searchKey = '';
  displayedColumns: string[] = ['id', 'cliente', 'estado', 'listo', 'observar', 'actions'];
  listData = new MatTableDataSource(PEDIDO_DATA);

  openDialog(): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '600px',
      height: '800px'
    });
  }
}
