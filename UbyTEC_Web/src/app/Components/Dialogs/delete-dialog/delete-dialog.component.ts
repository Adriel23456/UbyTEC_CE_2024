import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    // Cerrar el diálogo y devolver true
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Cerrar el diálogo y devolver false
    this.dialogRef.close(false);
  }
}
