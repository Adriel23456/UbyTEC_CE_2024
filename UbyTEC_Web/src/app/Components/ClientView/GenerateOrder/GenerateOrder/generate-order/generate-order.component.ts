import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-order',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './generate-order.component.html',
  styleUrl: './generate-order.component.css'
})
export class GenerateOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<GenerateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Client_Id: number, State: string, Product_Code: number}
  ) {}
  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y devuelve true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y devuelve false
  }

}
