import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Client, ClientService } from '../../../Services/Client/client.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  client!: Client;
  editClientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client, clients: Client[] },
    private clientService: ClientService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.client = { ...this.data.client }; // Clona la data para no modificar directamente el objeto.
    // Crear el formulario con las validaciones
    this.editClientForm = this.fb.group({
      UserId: [this.client.UserId, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Name: [this.client.Name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: [this.client.FirstSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: [this.client.SecondSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: [this.client.Province, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: [this.client.Canton, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: [this.client.District, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Password: [this.client.Password, [Validators.required, Validators.minLength(5)]],
      Phone: [this.client.Phone, [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      BirthDate: [this.formatDateToYYYYMMDD(this.client.BirthDate), [Validators.required]]
    });
  }

  updateClient(): void {
    const updatedClientData = { ...this.editClientForm.value };

    // Convertir la fecha al formato dd-mm-yyyy
    updatedClientData.BirthDate = this.formatDateToDDMMYYYY(updatedClientData.BirthDate);

    const isDuplicate = this.data.clients.some(client => client.UserId === updatedClientData.UserId);

    if(isDuplicate){
      this.showErrorDialog(`El usuario ${updatedClientData.UserId} ya fue registrado.`);
        return;
    }else{
      this.clientService.update(this.client.Id, updatedClientData).subscribe({
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

  formatDateToYYYYMMDD(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
