import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../../../material/material/material.module';
import {
  ProductPhotoUpdate,
  ProductService,
} from '../../../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-fotos',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-fotos.component.html',
  styleUrl: './update-fotos.component.css',
})
export class UpdateFotosComponent {
  constructor(
    public service: ProductService,
    public dialogRef: MatDialogRef<UpdateFotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getImage() {
    return this.service.imageForm.controls['PhotoURL'].value;
  }

  update() {
    var productPhotoUpdate: ProductPhotoUpdate = {
      PhotoURL: this.service.imageForm.controls['PhotoURL'].value,
    };

    if (this.service.imageForm.valid) {
      console.log(this.service.imageForm.controls['Product_Code'].value);
      console.log(this.data.oldURL);
      console.log(productPhotoUpdate);
      this.service
        .updatePhoto(
          this.service.imageForm.controls['Product_Code'].value,
          this.data.oldURL,
          productPhotoUpdate
        )
        .subscribe((data) => {
          this.service.imageForm.reset();
          this.dialogRef.close();
        });
    }
  }
}
