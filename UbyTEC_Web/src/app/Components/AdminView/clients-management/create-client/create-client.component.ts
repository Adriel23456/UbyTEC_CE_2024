import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Client, ClientService } from '../../../../Services/Client/client.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  createClientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clients: Client[] },
    private clientService: ClientService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    // Crear el formulario con las validaciones
    this.createClientForm = this.fb.group({
      Id: ['', [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      UserId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
      Phone: ['', [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      BirthDate: ['', [Validators.required]]
    });
  }

  createClient(): void {
    const updatedClientData = { ...this.createClientForm.value };

    // Convertir la fecha al formato dd-mm-yyyy
    updatedClientData.BirthDate = this.formatDateToDDMMYYYY(updatedClientData.BirthDate);

    const isDuplicate = this.data.clients.some(client => client.UserId === updatedClientData.UserId);

    const isIdUsed = this.data.clients.some(client => client.Id === updatedClientData.Id)

    if(isDuplicate){
      this.showErrorDialog(`El usuario ${updatedClientData.UserId} ya fue registrado.`);
      return;

    }if(isIdUsed){
      this.showErrorDialog(`La cédula ${updatedClientData.Id} ya fue registrada.`);
      return;
      
    }else{
      this.clientService.create(updatedClientData).subscribe({
        next: () => {
          // Si la actualización de los datos básicos es exitosa, procesar teléfonos
          console.log('cliente actualizado');
          console.log(updatedClientData);
  
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar cliente:', err);
        }
      });
    }  
  }

  formatDateToDDMMYYYY(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }

}
