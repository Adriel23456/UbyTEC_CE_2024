import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {titulo: string, message: string, btn: string},
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y devuelve true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y devuelve false
  }
}
