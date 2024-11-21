import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BusinessAssociatePhone } from '../../../Services/BusinessAssociate/business-associate.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-edit-associate-phone',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-associate-phone.component.html',
  styleUrl: './edit-associate-phone.component.css'
})
export class EditAssociatePhoneComponent {
  phoneForm: FormGroup;
  duplicatePhoneError: boolean = false; // Bandera para controlar el error de duplicado

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditAssociatePhoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { previousPhone: BusinessAssociatePhone, tempPhones: BusinessAssociatePhone[] }
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

      if (this.data.previousPhone.Phone === newPhone) {
        this.showErrorDialog(`El numero ${newPhone} no presentó cambios.`);
        return;
      } if (isDuplicate) {
        this.showErrorDialog(`El numero ${newPhone} ya fue registrado.`);
        return;
      } else {
        const phone: BusinessAssociatePhone = { Phone: newPhone, BusinessAssociate_Legal_Id: this.data.previousPhone.BusinessAssociate_Legal_Id };
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
