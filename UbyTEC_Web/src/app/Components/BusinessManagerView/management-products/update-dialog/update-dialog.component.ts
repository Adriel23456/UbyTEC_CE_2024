import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';
import { ProductService, ProductCreate, ProductUpdate } from '../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { NotificationService } from '../../../../Services/Notification/notification.service';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})
export class UpdateDialogComponent {
  constructor(public service: ProductService,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    public notificationService: NotificationService
  ){}

  onUpdate() {
    if (this.service.form.valid) {
        var productUpdate: ProductUpdate = {
            Name: this.service.form.controls['Name'].value,
            Price: this.service.form.controls['Price'].value,
            Category: this.service.form.controls['Category'].value,
            BusinessAssociate_Legal_Id: this.service.form.controls['BusinessAssociate_Legal_Id'].value
        }

        this.service.update(this.service.form.controls['Code'].value, productUpdate).subscribe((productUpdate)=>{
          this.service.form.reset();
          this.dialogRef.close();
          this.notificationService.success('Producto actualizado con éxito')
        })
    }
  }
}
