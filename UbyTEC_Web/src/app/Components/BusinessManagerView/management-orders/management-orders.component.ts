import { Component, model } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PedidoDialogComponent } from './pedido-dialog/pedido-dialog.component';
import {
  Order,
  OrderService,
  OrderWName,
} from '../../../Services/Order/order.service';
import { Client, ClientService } from '../../../Services/Client/client.service';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-management-orders',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './management-orders.component.html',
  styleUrl: './management-orders.component.css',
})
export class ManagementOrdersComponent {
  constructor(
    private dialog: MatDialog,
    private service: OrderService,
    private clientService: ClientService
  ) {}

  searchKey = '';
  pedidos: Order[] = [];
  pedidos2: OrderWName[] = [];
  displayedColumns: string[] = [
    'id',
    'cliente',
    'estado',
    'listo',
    'observar',
    'actions',
  ];

  categorias = [
    { value: 'En camino' },
    { value: 'Finalizado' },
    { value: 'Preparando' },
    { value: 'Cancelado' },
    { value: 'Listo para envio' },
  ];

  listData = new MatTableDataSource<any>();

  ngOnInit() {
    this.service.getAll().subscribe((list) => {
      const requests = list.map((item) =>
        this.clientService.getById(item.Client_Id).pipe(
          map((client) => ({
            ...item,
            $client: client.FullName,
          }))
        )
      );

      forkJoin(requests).subscribe((array) => {
        this.listData.data = array;
      });
    });
  }

  readonly disabled = model(false);

  onDelete(order: any) {
    this.service.delete(order).subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '600px',
      height: '800px',
      data: { orden: row },
    });
  }
}
