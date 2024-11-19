import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ErrorMessageComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    // Cerrar el diálogo
    this.dialogRef.close();
  }
}
