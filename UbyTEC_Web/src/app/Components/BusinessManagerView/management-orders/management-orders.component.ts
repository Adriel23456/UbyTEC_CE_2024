import { ChangeDetectorRef, Component, model, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

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
    public service: OrderService,
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
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

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

      this.listData.paginator = this.paginator;
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
      width: '800px',
      height: '800px',
      maxWidth: '800px',
      data: { orden: row },
    });
  }

  onClear() {
    this.service.form.controls['searchKey'].setValue('');
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.service.form.controls['searchKey'].value
      .trim()
      .toLowerCase();
  }

  applySelectedFilter() {
    this.listData.filter = this.service.form.controls['Category'].value;
  }
}
