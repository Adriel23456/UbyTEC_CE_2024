import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FeedBackService, FeedBackUpdate } from '../../../Services/FeedBack/feed-back.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
   @Inject(MAT_DIALOG_DATA) public data: { FeedBackId: number },
   private feedBackService: FeedBackService,
   private snackBar: MatSnackBar
 ) {}

 private validateInput(): boolean {
   // Validar textos
   if (!this.feedbackB.trim() || !this.feedbackO.trim() || !this.feedbackD.trim()) {
     this.snackBar.open('Por favor, complete todos los campos de texto', 'Cerrar', { duration: 3000 });
     return false;
   }

   // Validar notas
   if (this.noteB === null || this.noteO === null || this.noteD === null) {
     this.snackBar.open('Por favor, ingrese todas las calificaciones', 'Cerrar', { duration: 3000 });
     return false;
   }

   // Validar rango de notas
   if ([this.noteB, this.noteO, this.noteD].some(note => note < 0 || note > 5)) {
     this.snackBar.open('Las calificaciones deben estar entre 0 y 5', 'Cerrar', { duration: 3000 });
     return false;
   }

   return true;
 }

 onConfirm(): void {
   if (!this.validateInput()) return;

   this.feedBackService.getById(this.data.FeedBackId).subscribe({
     next: (currentFeedback) => {
       const feedbackUpdate: FeedBackUpdate = {
         FeedBack_Business: this.feedbackB,
         BusinessGrade: this.noteB!,
         FeedBack_Order: this.feedbackO,
         OrderGrade: this.noteO!,
         FeedBack_DeliveryMan: this.feedbackD,
         DeliveryManGrade: this.noteD!,
         FoodDeliveryMan_UserId: currentFeedback.FoodDeliveryMan_UserId,
         Order_Code: currentFeedback.Order_Code,
         BusinessAssociate_Legal_Id: currentFeedback.BusinessAssociate_Legal_Id
       };

       this.feedBackService.update(this.data.FeedBackId, feedbackUpdate).subscribe({
         next: () => {
           this.snackBar.open('Feedback completado exitosamente', 'Cerrar', { duration: 3000 });
           this.dialogRef.close(true);
         },
         error: (error) => {
           console.error('Error updating feedback:', error);
           this.snackBar.open('Error al actualizar el feedback', 'Cerrar', { duration: 3000 });
         }
       });
     },
     error: (error) => {
       console.error('Error getting feedback:', error);
       this.snackBar.open('Error al obtener el feedback', 'Cerrar', { duration: 3000 });
     }
   });
 }
}