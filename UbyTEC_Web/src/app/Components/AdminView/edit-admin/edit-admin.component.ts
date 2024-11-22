import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPhoneComponent } from '../add-phone/add-phone.component';
import { EditPhoneComponent } from '../edit-phone/edit-phone.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Admin, AdminPhone, AdminService } from '../../../Services/Admin/admin.service';
import { ErrorMessageComponent } from '../error-message/error-message.component'

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit {
  admin!: Admin;
  admins!: Admin[];
  editAdminForm!: FormGroup;
  tempPhones: AdminPhone[] = [];
  addedPhones: AdminPhone[] = [];
  editedPhones: [AdminPhone, AdminPhone][] = [];
  deletedPhones: AdminPhone[] = [];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { admin: Admin },
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
    this.loadAdmins();
  
    this.admin = { ...this.data.admin }; // Clona la data para no modificar directamente el objeto.
    
    this.loadPhones();
    // Crear el formulario con las validaciones
    this.editAdminForm = this.fb.group({
      Name: [this.admin.Name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: [this.admin.FirstSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: [this.admin.SecondSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: [this.admin.Province, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: [this.admin.Canton, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: [this.admin.District, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      UserId: [this.admin.UserId, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Password: [this.admin.Password, [Validators.required, Validators.minLength(5)]]
    });
  }

  loadPhones(): void {
    this.adminService.getPhonesByAdminId(this.admin.Id).subscribe(phones => {
      this.tempPhones = phones;
      this.totalPhonePages = Math.ceil(phones.length / 1); // Suponiendo 1 elemento por página
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

  loadAdmins(): void { 
    this.adminService.getAll().subscribe({
      next: (data: Admin[]) => {
        const admins = data;
        this.admins = admins;
      },
      error: (err) => console.error('Error al cargar administradores: ',err)
    })
  }

  editPhone(previousPhone: AdminPhone): void {
    const dialogRef = this.dialog.open(EditPhoneComponent, {
      width: '400px',
      data: { previousPhone: previousPhone, tempPhones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verificaciones para evitar inconsistencias 

        // Si el número editado estaba en addedPhones, se actualiza tambien.
        const addedIndex = this.addedPhones.findIndex(p => p.Phone === previousPhone.Phone);
        if (addedIndex !== -1) {
          this.addedPhones[addedIndex] = result;
        } else {
          //Si el número ya existía, registra el cambio en editedPhones.
          const editedIndex = this.editedPhones.findIndex(e => e[0].Phone === previousPhone.Phone);
          if (editedIndex !== -1) {
            this.editedPhones[editedIndex][1] = result; // Actualizar el nuevo valor
          } else {
            this.editedPhones.push([previousPhone, result]); //Cola de actualizacion para numeros nunca actualizados
          }
        }

        // Actualizacion de tempPhones
        const tempIndex = this.tempPhones.findIndex(p => p.Phone === previousPhone.Phone);
        if (tempIndex !== -1) {
          this.tempPhones[tempIndex] = result;
        }
      }
    })

  }

  deletePhone(phone: AdminPhone): void {
    // Verifica si el teléfono estaba recién agregado.
    const addedIndex = this.addedPhones.findIndex(p => p.Phone === phone.Phone);
    if (addedIndex !== -1) {
      // Si estaba en addedPhones, se elimina esa entrada.
      this.addedPhones.splice(addedIndex, 1);
    } else { //no estaba en addedPhones
      // Verifica si el teléfono está en editedPhones.
      const editedIndex = this.editedPhones.findIndex(e => e[1].Phone === phone.Phone);
      if (editedIndex !== -1) {
        this.editedPhones.splice(editedIndex, 1); // Eliminar cualquier cambio pendiente.
      }
      // Si el teléfono ya estaba en la db se añade a deletedPhones
      this.deletedPhones.push(phone);
    }

    // Siempre se actualiza tempPhones
    this.tempPhones = this.tempPhones.filter(p => p.Phone !== phone.Phone);

    // Actualiza la paginación.
    this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
    this.currentPhonePage = 1;
  }

  //solo agrega el telefono a la lista temporal
  //se agrega a la db solo en caso de presionar el boton de actualizar
  addPhone(): void {
    const dialogRef = this.dialog.open(AddPhoneComponent, {
      width: '400px',
      data: { admin: this.admin.Id, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.addedPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
      }
    })
  }

  updateAdmin(): void {
    const updatedAdminData = this.editAdminForm.value;

    const isUserTaken = this.admins.some(admin => admin.UserId === updatedAdminData.UserId);

    if (isUserTaken) {
      this.showErrorDialog('El usuario ya está en uso. Por favor, ingresa uno diferente.');
      return;
    }
 
    this.adminService.update(this.admin.Id, updatedAdminData).subscribe({
      next: () => {
        // Si la actualización de los datos básicos es exitosa, procesar teléfonos
        console.log('administrador actualizado');
        console.log(updatedAdminData);

        this.processPhoneChanges();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al actualizar administrador:', err);
      }
    });
  }

  private processPhoneChanges(): void {
    const adminId = this.admin.Id;

    // Agregar nuevos teléfonos
    this.addedPhones.forEach(phone => {
      this.adminService.createPhone(phone).subscribe({
        next: () => {
          console.log(`Teléfono ${phone.Phone} agregado exitosamente.`);
        },
        error: (err) => {
          console.error(`Error al agregar teléfono ${phone.Phone}:`, err);
        }
      });
    });

    // Editar teléfonos existentes
    this.editedPhones.forEach(([oldPhone, newPhone]) => {
      this.adminService.updatePhone(adminId, oldPhone.Phone, { Phone: newPhone.Phone }).subscribe({
        next: () => {
          console.log(`Teléfono ${oldPhone.Phone} actualizado a ${newPhone.Phone} exitosamente.`);
        },
        error: (err) => {
          console.error(`Error al actualizar teléfono ${oldPhone.Phone}:`, err);
        }
      });
    });

    // Eliminar teléfonos
    this.deletedPhones.forEach(phone => {
      this.adminService.deletePhone(adminId, phone.Phone).subscribe({
        next: () => {
          console.log(`Teléfono ${phone.Phone} eliminado exitosamente.`);
        },
        error: (err) => {
          console.error(`Error al eliminar teléfono ${phone.Phone}:`, err);
        }
      });
    });

    // Resetear listas locales tras procesar cambios
    this.resetPhoneLists();
  }

  private resetPhoneLists(): void {
    this.addedPhones = [];
    this.editedPhones = [];
    this.deletedPhones = [];
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
