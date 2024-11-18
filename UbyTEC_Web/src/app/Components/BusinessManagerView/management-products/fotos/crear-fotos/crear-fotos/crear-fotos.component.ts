import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../../../material/material/material.module';
import { ProductService } from '../../../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-fotos',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-fotos.component.html',
  styleUrl: './crear-fotos.component.css',
})
export class CrearFotosComponent {
  constructor(
    public service: ProductService,
    public dialogRef: MatDialogRef<CrearFotosComponent>
  ) {}

  getImage() {
    return this.service.imageForm.controls['PhotoURL'].value;
  }

  create() {
    if (this.service.imageForm.valid) {
      this.service
        .createPhoto(this.service.imageForm.value)
        .subscribe((data) => {
          this.service.imageForm.reset();
          this.dialogRef.close();
        });
    }
  }
}
