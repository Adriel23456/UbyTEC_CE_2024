import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import {
  ProductService,
  Product,
} from '../../../Services/Product/product.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NotificationService } from '../../../Services/Notification/notification.service';
import { FotosComponent } from './fotos/fotos/fotos.component';
import { CrearFotosComponent } from './fotos/crear-fotos/crear-fotos/crear-fotos.component';

@Component({
  selector: 'app-management-products',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    FotosComponent,
    CrearFotosComponent,
  ],
  templateUrl: './management-products.component.html',
  styleUrl: './management-products.component.css',
})
export class ManagementProductsComponent {
  constructor(
    private dialog: MatDialog,
    public service: ProductService,
    public notificationService: NotificationService
  ) {}

  products: Product[] = [];
  searchKey = '';
  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'actions'];

  ngOnInit() {
    this.service.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog
      .open(CreateDialogComponent, {
        autoFocus: true,
        height: '90%',
        width: '800px',
        maxWidth: '800px',
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      }); // Actualiza lista luego de cerrar
  }

  updateDialog(selectedCode: number, data: any): void {
    console.log(data);
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog
      .open(UpdateDialogComponent, {
        autoFocus: true,
        height: '90%',
        width: '800px',
        maxWidth: '800px',
        data: { code: selectedCode },
      })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      }); // Actualiza lista luego de cerrar
  }

  deleteProducto(row: any): void {
    this.dialog
      .open(DeleteDialogComponent, {
        disableClose: true,
        data: {
          message: '¿Eliminar esta entrada?',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.service.delete(row).subscribe((row) => {
            this.ngOnInit();
            this.notificationService.success('Producto eliminado con éxito');
          });
        }
      });
  }
}
