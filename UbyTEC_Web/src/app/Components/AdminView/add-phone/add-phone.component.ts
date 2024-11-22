import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdminPhone } from '../../../Services/Admin/admin.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  phoneForm: FormGroup;
  duplicatePhoneError: boolean = false; // Bandera para controlar el error de duplicado


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPhoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { admin: number , phones: AdminPhone[]}
  ) {
    // Inicialización del formulario con validación
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]]
    });
  }

  // Confirmar: emitir el nuevo número si el formulario es válido
  onConfirm(): void {
    if (this.phoneForm.valid) {
      
      const newPhone = this.phoneForm.value.phone;

      // Verificar si el número ya existe en el arreglo `phones`
      const isDuplicate = this.data.phones.some(phone => phone.Phone === newPhone);

      if (isDuplicate) {
        this.showErrorDialog(`El numero ${newPhone} ya fue registrado.`);
        return;

      } else {
        const phone: AdminPhone = { Phone: newPhone, Admin_id: this.data.admin };
        console.log(phone);
        this.dialogRef.close(phone); // Retorna el teléfono y cierra el diálogo
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