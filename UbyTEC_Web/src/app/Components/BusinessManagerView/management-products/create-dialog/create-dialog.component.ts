import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';
import { ProductService, ProductCreate } from '../../../../Services/Product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../../Services/Notification/notification.service';
import { FotosComponent } from '../fotos/fotos/fotos.component';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, FotosComponent],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css'
})

export class CreateDialogComponent {
  constructor(public service: ProductService,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public notificationService: NotificationService,
    
  ){}

  categorias = [
    {value: 'Entrada'},
    {value: 'Plato principal'},
    {value: 'Bebida'},
    {value: 'Complemento'},
    {value: 'Postre'},
    {value: 'Medicamento'},
    {value: 'Producto general'},
    {value: 'Extra'},
  ];

  onSubmit(data:any) {
    if (this.service.form.valid) {
      this.service.create(data).subscribe((data)=>{
        this.service.form.reset();
        this.dialogRef.close();
        this.notificationService.success('Producto creado con éxito')
      })
    }
  }
}