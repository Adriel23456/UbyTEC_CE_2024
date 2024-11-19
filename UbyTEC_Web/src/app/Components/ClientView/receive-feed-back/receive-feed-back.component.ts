import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FeedBackCreate, FeedBackService } from '../../../Services/FeedBack/feed-back.service';

@Component({
  selector: 'app-receive-feed-back',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './receive-feed-back.component.html',
  styleUrl: './receive-feed-back.component.css'
})
export class ReceiveFeedBackComponent {
  feedbackB: string = '';               
  noteB: number | null = null;    
  feedbackO: string = '';               
  noteO: number | null = null;
  feedbackD: string = '';               
  noteD: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<ReceiveFeedBackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Order_Code: number, BusinessAssociate_Legal_Id: number, FoodDeliveryMan_UserId: string},
    private feedBackService: FeedBackService
  ) {}

  onConfirm(): void {
    if (this.feedbackB && this.noteB && this.feedbackO && this.noteO && this.feedbackD && this.noteD ) {
      const feedbackCreate: FeedBackCreate = {
        FeedBack_Business: this.feedbackB,
        BusinessGrade: this.noteB,
        FeedBack_Order: this.feedbackO,
        OrderGrade: this.noteO,
        FeedBack_DeliveryMan: this.feedbackD,
        DeliveryManGrade: this.noteD,
        FoodDeliveryMan_UserId: this.data.FoodDeliveryMan_UserId,
        Order_Code: this.data.Order_Code,
        BusinessAssociate_Legal_Id: this.data.BusinessAssociate_Legal_Id,
      };

      this.feedBackService.create(feedbackCreate).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al crear el feedback:', err);
          alert('Ocurrió un error al enviar el feedback. Por favor, intente nuevamente.');
        },
      });
    } else {
      alert('Por favor, complete todos los campos antes de confirmar.');
    }
  }
}
