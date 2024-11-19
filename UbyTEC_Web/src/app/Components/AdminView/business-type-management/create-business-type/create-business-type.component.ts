import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { BusinessType, BusinessTypeCreate } from '../../../../Services/BusinessType/business-type.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';

@Component({
  selector: 'app-create-business-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-business-type.component.html',
  styleUrl: './create-business-type.component.css'
})
export class CreateBusinessTypeComponent {
  typeForm: FormGroup;
  duplicateType: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateBusinessTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {types: BusinessType[]}
  ) {
    // Inicialización del formulario con validación
    this.typeForm = this.fb.group({
      type: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  // Confirmar: emitir el nuevo tipo si el formulario es válido
  onConfirm(): void {
    if (this.typeForm.valid) {
      
      const newType = this.typeForm.value.type;

      // Verificar si el número ya existe en el arreglo `types`
      const isDuplicate = this.data.types.some(type => type.Name === newType);

      if (isDuplicate) {
        this.showErrorDialog(`El tipo ${newType} ya fue registrado.`);
        return;

      } else {
        const type: BusinessTypeCreate = { Name: newType };
        this.dialogRef.close(type); // Retorna el tipo y cierra el diálogo
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
