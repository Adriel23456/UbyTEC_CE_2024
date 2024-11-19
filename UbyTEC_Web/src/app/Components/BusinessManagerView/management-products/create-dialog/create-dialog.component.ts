import { Component, Inject, ɵɵsetComponentScope } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';
import {
  ProductService,
  ProductCreate,
  ProductPhoto,
} from '../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../../Services/Notification/notification.service';
import { FotosComponent } from '../fotos/fotos/fotos.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CrearFotosComponent } from '../fotos/crear-fotos/crear-fotos/crear-fotos.component';
import { UpdateFotosComponent } from '../fotos/update-fotos/update-fotos/update-fotos.component';
import { BusinessAssociateService } from '../../../../Services/BusinessAssociate/business-associate.service';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FotosComponent,
    MatTableModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
})
export class CreateDialogComponent {
  constructor(
    public service: ProductService,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public notificationService: NotificationService,
    public dialog: MatDialog,
    public baService: BusinessAssociateService
  ) {}

  displayedColumns: string[] = ['url', 'actions'];
  productPhotos = new MatTableDataSource<any>([]);

  categorias = [
    { value: 'Entrada' },
    { value: 'Plato principal' },
    { value: 'Bebida' },
    { value: 'Complemento' },
    { value: 'Postre' },
    { value: 'Medicamento' },
    { value: 'Producto general' },
    { value: 'Extra' },
  ];

  createNextPicture(code: any, index: number) {
    const photos = this.productPhotos.data;

    const productPhoto: ProductPhoto = {
      Product_Code: code,
      PhotoURL: photos[index],
    };

    console.log(productPhoto);

    this.service.createPhoto(productPhoto).subscribe({
      next: () => {
        this.service.imageForm.reset();
        this.dialogRef.close();
        this.createNextPicture(code, index + 1);
      },
    });
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.form.controls['BusinessAssociate_Legal_Id'].setValue(
        this.baService.currentBusinessAssociateValue?.Legal_Id
      );

      this.service.create(this.service.form.value).subscribe({
        next: (product) => {
          this.createNextPicture(product.Code, 0);
          this.service.form.reset();
          this.dialogRef.close();
          this.notificationService.success('Producto creado con éxito');
        },
      });
    }
  }

  crearFoto() {
    this.service.imageForm.controls['Product_Code'].setValue('');
    this.dialog
      .open(CrearFotosComponent, {
        height: '85%',
        maxWidth: '540px',
        width: '540px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          const photos = this.productPhotos.data;
          this.productPhotos.data = [...photos, result];
        }
      }); // Actualiza lista luego de cerrar
  }

  editarFoto(photo: any) {
    this.service.populateImageForm(photo);
    this.service.imageForm.controls['Product_Code'].setValue('');
    this.dialog
      .open(UpdateFotosComponent, {
        height: '85%',
        maxWidth: '540px',
        width: '540px',
        data: { oldURL: this.service.imageForm.controls['PhotoURL'].value },
      })
      .afterClosed()
      .subscribe(() => {}); // Actualiza lista luego de cerrar
  }

  eliminarFoto(rowid: number) {
    if (rowid > -1) {
      this.productPhotos.data.splice(rowid, 1);
      this.productPhotos._updateChangeSubscription();
    }
  }
}
