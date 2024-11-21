import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog-admin',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './delete-dialog-admin.component.html',
  styleUrl: './delete-dialog-admin.component.css'
})
export class DeleteDialogAdminComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogAdminComponent>,
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
