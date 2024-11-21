import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPhoneComponent } from '../add-phone/add-phone.component';
import { EditPhoneComponent } from '../edit-phone/edit-phone.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminPhone, AdminService } from '../../../Services/Admin/admin.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css'
})
export class CreateAdminComponent implements OnInit {
  createAdminForm!: FormGroup;
  tempPhones: AdminPhone[] = [];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAdminComponent>,
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Crear el formulario con las validaciones
    this.createAdminForm = this.fb.group({
      Id: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      UserId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  getPhonesForCurrentPage(): AdminPhone[] {
    const start = (this.currentPhonePage - 1) * 1;
    return this.tempPhones.slice(start, start + 1);
  }

  nextPhonePage(): void {
    if (this.currentPhonePage < this.totalPhonePages) {
      this.currentPhonePage++;
    }
  }

  previousPhonePage(): void {
    if (this.currentPhonePage > 1) {
      this.currentPhonePage--;
    }
  }

  editPhone(previousPhone: AdminPhone): void {
    const dialogRef = this.dialog.open(EditPhoneComponent, {
      width: '400px',
      data: { previousPhone: previousPhone, tempPhones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza el teléfono editado directamente en `tempPhones`
        const tempIndex = this.tempPhones.findIndex(p => p.Phone === previousPhone.Phone);
        if (tempIndex !== -1) {
          this.tempPhones[tempIndex] = result;
        }
      }
    })
  }

  deletePhone(phone: AdminPhone): void {
    // Elimina el teléfono de `tempPhones`
    this.tempPhones = this.tempPhones.filter(p => p.Phone !== phone.Phone);

    // Actualiza la paginación.
    this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
    this.currentPhonePage = 1;
  }

  //solo agrega el telefono a la lista temporal
  //se agrega a la db solo en caso de presionar el boton de actualizar
  addPhone(): void {
    // Validar si la cédula (Id) es válida antes de abrir el diálogo.
    const adminIdControl = this.createAdminForm.get('Id');
  
    if (!adminIdControl || adminIdControl.invalid) {
      // Mostrar un mensaje de advertencia o manejar el error
      this.showErrorDialog('Por favor, ingrese una cédula válida antes de agregar un teléfono.');
      return;
    }

    const adminId = adminIdControl.value;

    const dialogRef = this.dialog.open(AddPhoneComponent, {
      width: '400px',
      data: { admin: adminId, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
      }
    })
  }

  createAdmin(): void {
    const newAdminData = this.createAdminForm.value;

    // Crear el administrador
    this.adminService.create(newAdminData).subscribe({
      next: () => {
        console.log('Administrador creado exitosamente:');
        console.log(newAdminData);

        this.processPhones();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al crear administrador:', err);
      }
    });
  }

  private processPhones(): void {
    // Agregar los nuevos teléfonos
    this.tempPhones.forEach(phone => {
      this.adminService.createPhone(phone).subscribe({
        next: () => {
          console.log(`Teléfono ${phone.Phone} agregado exitosamente.`);
        },
        error: (err) => {
          console.error(`Error al agregar teléfono ${phone.Phone}:`, err);
        }
      });
    });
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
