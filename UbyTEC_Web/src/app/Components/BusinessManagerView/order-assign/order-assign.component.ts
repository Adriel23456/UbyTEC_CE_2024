import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

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
  selector: 'app-order-assign',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './order-assign.component.html',
  styleUrl: './order-assign.component.css'
})
export class OrderAssignComponent {
  searchKey = '';
  displayedColumns: string[] = ['id', 'cliente', 'estado', 'listo', 'observar', 'actions'];
  listData = new MatTableDataSource(PEDIDO_DATA);
}
