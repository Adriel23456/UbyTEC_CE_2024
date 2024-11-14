import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';
import { ProductService, ProductCreate } from '../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css'
})

export class CreateDialogComponent {
  constructor(public service: ProductService,
    public dialogRef: MatDialogRef<CreateDialogComponent> 
  ){}

  onSubmit(data:any) {
    if (this.service.form.valid) {
      this.service.create(data).subscribe((data)=>{
        console.log(data)
        this.dialogRef.close();
      })
    }
  }
}