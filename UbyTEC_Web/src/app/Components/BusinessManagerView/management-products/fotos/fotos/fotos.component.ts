import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { ProductPhoto, ProductService } from '../../../../../Services/Product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearFotosComponent } from '../crear-fotos/crear-fotos/crear-fotos.component';
import { UpdateFotosComponent } from '../update-fotos/update-fotos/update-fotos.component';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [MaterialModule, MatTableModule],
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.css'
})

export class FotosComponent {
  constructor(
    public service: ProductService,
    private dialog: MatDialog,
  ){}

  @Input() code: number = 0;

  displayedColumns: string[] = ['url', 'actions'];
  productPhotos: ProductPhoto[] = []

  ngOnInit() {
    this.service.getPhotosByCode(this.code).subscribe({
      next: (data: ProductPhoto[]) =>
      {
        this.productPhotos = data;
      },
    })
  }

  crearFoto() {
    this.service.imageForm.controls['Product_Code'].setValue(this.code);
    this.dialog.open(CrearFotosComponent, {
      height: '85%', 
      maxWidth: '540px', 
      width: '540px',
    }).afterClosed().subscribe(() => {this.ngOnInit()}); // Actualiza lista luego de cerrar
  }

  editarFoto(photo: any) {
    this.service.populateImageForm(photo);
    this.service.imageForm.controls['Product_Code'].setValue(this.code);
    this.dialog.open(UpdateFotosComponent, {
      height: '85%', 
      maxWidth: '540px', 
      width: '540px',
      data: {oldURL: this.service.imageForm.controls['PhotoURL'].value}
    }).afterClosed().subscribe(() => {this.ngOnInit()}); // Actualiza lista luego de cerrar
  }

  eliminarFoto(row:any) {
    this.service.deletePhoto(row.Product_Code, row.PhotoURL).subscribe(()=>{this.ngOnInit()})
  }
}
