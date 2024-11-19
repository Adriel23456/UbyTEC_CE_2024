import { Component, Inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../../Services/Product/product.service';
import { MaterialModule } from '../../../../../material/material/material.module';

@Component({
  selector: 'app-update-crear-fotos',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-crear-fotos.component.html',
  styleUrl: './update-crear-fotos.component.css',
})
export class UpdateCrearFotosComponent {
  constructor(
    public service: ProductService,
    public dialogRef: MatDialogRef<UpdateCrearFotosComponent>
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
