import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';


@Component({
  selector: 'app-reject-associate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reject-associate.component.html',
  styleUrl: './reject-associate.component.css'
})
export class RejectAssociateComponent {
  rejectReasonForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RejectAssociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rejectReason: string }
  ) {
    // Inicialización del formulario con validación y cargando el número antiguo
    this.rejectReasonForm = this.fb.group({
      rejectMsj: [data.rejectReason, [Validators.required]]
    });
  }

  // Confirmar: emitir el nuevo número si el formulario es válido
  onConfirm(): void {
    if (this.rejectReasonForm.valid) {
      const newRejectReason = this.rejectReasonForm.value.rejectMsj;

      if (this.data.rejectReason === newRejectReason) {
        this.showErrorDialog(`La razón de rechazo: "${newRejectReason}" no presentó cambios.`);
        return;
      }else {
        this.dialogRef.close(newRejectReason); // Retorna el teléfono editado y cierra el diálogo
      }
    }
  }

  // Cancelar: cerrar el diálogo sin hacer nada
  onCancel(): void {
    this.dialogRef.close(false); // Retorna false cuando se cancela
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
