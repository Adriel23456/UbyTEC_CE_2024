import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { ComunicationService } from '../../../Services/Comunication/comunication.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { map } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

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
    public commService: ComunicationService,
    public notificationService: NotificationService,
    public baService: BusinessAssociateService
  ) {}

  products: Product[] = [];
  productsData = new MatTableDataSource<any>();
  searchKey = '';
  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

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
      this.productsData.paginator = this.paginator;
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

  onClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.productsData.filter = this.searchKey.trim().toLowerCase();
  }
}
