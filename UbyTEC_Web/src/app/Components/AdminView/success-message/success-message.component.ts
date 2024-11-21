import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.css'
})
export class SuccessMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    // Cerrar el diálogo
    this.dialogRef.close();
  }
}
