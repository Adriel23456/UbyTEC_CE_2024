import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ErrorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    // Cerrar el diálogo
    this.dialogRef.close();
  }
}
