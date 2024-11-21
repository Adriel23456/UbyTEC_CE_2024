import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminPhone } from '../../../Services/Admin/admin.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-edit-phone',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-phone.component.html',
  styleUrl: './edit-phone.component.css'
})
export class EditPhoneComponent {
  phoneForm: FormGroup;
  duplicatePhoneError: boolean = false; // Bandera para controlar el error de duplicado

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPhoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { previousPhone: AdminPhone, tempPhones: AdminPhone[] }
  ) {
    // Inicialización del formulario con validación y cargando el número antiguo
    this.phoneForm = this.fb.group({
      phone: [data.previousPhone.Phone, [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]]
    });
  }
  // Confirmar: emitir el nuevo número si el formulario es válido
  onConfirm(): void {
    if (this.phoneForm.valid) {
      const newPhone = this.phoneForm.value.phone;
      
      // Verificar si el número ya existe en el arreglo `phones`
      const isDuplicate = this.data.tempPhones.some(phone => phone.Phone === newPhone);
      
      if (this.data.previousPhone.Phone === newPhone){
        this.showErrorDialog(`El numero ${newPhone} no presentó cambios.`);
        return;
      }if (isDuplicate) {
        this.showErrorDialog(`El numero ${newPhone} ya fue registrado.`);
        return;
      } else {
        const phone: AdminPhone = { Phone: newPhone, Admin_id: this.data.previousPhone.Admin_id };
        this.dialogRef.close(phone); // Retorna el teléfono editado y cierra el diálogo
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
