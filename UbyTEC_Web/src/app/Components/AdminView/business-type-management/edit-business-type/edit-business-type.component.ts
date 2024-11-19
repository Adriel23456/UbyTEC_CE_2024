import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BusinessType, BusinessTypeUpdate } from '../../../../Services/BusinessType/business-type.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';

@Component({
  selector: 'app-edit-business-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-business-type.component.html',
  styleUrl: './edit-business-type.component.css'
})
export class EditBusinessTypeComponent {
  typeForm: FormGroup;
  duplicateType: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBusinessTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: BusinessType, types: BusinessType[] }
  ) {
    // Inicialización del formulario con validación y cargando el número antiguo
    this.typeForm = this.fb.group({
      type: [data.type.Name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  // Confirmar: emitir el nuevo número si el formulario es válido
  onConfirm(): void {
    if (this.typeForm.valid) {
      const newType = this.typeForm.value.type;

      // Verificar si el tipo ya existe en el arreglo `types`
      const isDuplicate = this.data.types.some(type => type.Name === newType);

      if (this.data.type.Name === newType) {
        this.showErrorDialog(`El tipo ${newType} no presentó cambios.`);
        return;
      } if (isDuplicate) {
        this.showErrorDialog(`El tipo ${newType} ya fue registrado.`);
        return;
      } else {
        const type: BusinessTypeUpdate = { Name: newType };
        this.dialogRef.close(type); // Retorna el teléfono editado y cierra el diálogo
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
