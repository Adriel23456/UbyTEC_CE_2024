import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { MaterialModule } from '../../../../material/material/material.module';
import { FotosComponent } from '../../management-products/fotos/fotos/fotos.component';
import { CrearFotosComponent } from '../../management-products/fotos/crear-fotos/crear-fotos/crear-fotos.component';
import {
  Product,
  ProductService,
} from '../../../../Services/Product/product.service';
import { ComunicationService } from '../../../../Services/Comunication/comunication.service';
import { NotificationService } from '../../../../Services/Notification/notification.service';
import { BusinessAssociateService } from '../../../../Services/BusinessAssociate/business-associate.service';
import { CreateDialogComponent } from '../../management-products/create-dialog/create-dialog.component';
import { UpdateDialogComponent } from '../../management-products/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../../management-products/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-productos-table',
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
  templateUrl: './productos-table.component.html',
  styleUrl: './productos-table.component.css',
})
export class ProductosTableComponent {
  constructor(
    private dialog: MatDialog,
    public service: ProductService,
    public commService: ComunicationService,
    public notificationService: NotificationService,
    public baService: BusinessAssociateService
  ) {}

  products: Product[] = [];
  productsData = new MatTableDataSource<any>();
  searchKey = '';
  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'actions'];

  ngOnInit() {
    this.service.getAll().subscribe((list) => {
      let array = list
        .filter(
          (item) =>
            item.BusinessAssociate_Legal_Id ==
            this.baService.currentBusinessAssociateValue?.Legal_Id
        )
        .map((filteredItem) => {
          return {
            Code: filteredItem.Code,
            Name: filteredItem.Name,
            Price: filteredItem.Price,
            Category: filteredItem.Category,
            BusinessAssociate_Legal_Id: filteredItem.BusinessAssociate_Legal_Id,
          };
        });
      this.productsData = new MatTableDataSource(array);
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
    console.log(selectedCode);
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
