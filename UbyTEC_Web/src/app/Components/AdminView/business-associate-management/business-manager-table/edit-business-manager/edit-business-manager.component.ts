import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessManagerService, BusinessManager, BusinessManagerPhone, BusinessManagerUpdate } from '../../../../../Services/BusinessManager/business-manager.service';
import { CreateBusinessManagerPhoneComponent } from '../create-business-manager-phone/create-business-manager-phone.component';
import { EditBusinessManagerPhoneComponent } from '../edit-business-manager-phone/edit-business-manager-phone.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-business-manager',
  templateUrl: './edit-business-manager.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-business-manager.component.css'],
})

export class EditBusinessManagerComponent implements OnInit {
  businessManager!: BusinessManager;
  editBusinessManagerForm!: FormGroup;
  tempPhones: BusinessManagerPhone[] = [];
  addedPhones: BusinessManagerPhone[] = [];
  editedPhones: [BusinessManagerPhone, BusinessManagerPhone][] = [];
  deletedPhones: BusinessManagerPhone[] = [];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBusinessManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { businessManager: BusinessManager },
    private businessManagerService: BusinessManagerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.businessManager = { ...this.data.businessManager };
    this.loadPhones();

    // Crear el formulario con validaciones
    this.editBusinessManagerForm = this.fb.group({
      Name: [this.businessManager.Name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: [this.businessManager.FirstSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: [this.businessManager.SecondSurname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: [this.businessManager.Province, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: [this.businessManager.Canton, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: [this.businessManager.District, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      UserId: [{ value: this.businessManager.UserId, disabled: true }],
      Email: [{ value: this.businessManager.Email, disabled: true }]
    });
  }

  loadPhones(): void {
    this.businessManagerService.getPhonesByEmail(this.businessManager.Email).subscribe(phones => {
      this.tempPhones = phones;
      this.totalPhonePages = Math.ceil(phones.length / 1); // 1 teléfono por página
    });
  }

  //Paginación 

  getPhonesForCurrentPage(): BusinessManagerPhone[] {
    const start = (this.currentPhonePage - 1) * 1;
    return this.tempPhones.slice(start, start + 1).filter(phone => phone !== undefined);
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


  editPhone(previousPhone: BusinessManagerPhone): void {
    const dialogRef = this.dialog.open(EditBusinessManagerPhoneComponent, {
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
    });
  }

  deletePhone(phone: BusinessManagerPhone): void {
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

  addPhone(): void {
    const dialogRef = this.dialog.open(CreateBusinessManagerPhoneComponent, {
      width: '400px',
      data: { Email: this.businessManager.Email, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.addedPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1)
      }
    });
  }

  updateBusinessManager(): void {
    const updatedBusinessManagerData: BusinessManagerUpdate = {
      Name: this.editBusinessManagerForm.get('Name')?.value,
      FirstSurname: this.editBusinessManagerForm.get('FirstSurname')?.value,
      SecondSurname: this.editBusinessManagerForm.get('SecondSurname')?.value,
      Province: this.editBusinessManagerForm.get('Province')?.value,
      Canton: this.editBusinessManagerForm.get('Canton')?.value,
      District: this.editBusinessManagerForm.get('District')?.value,
      UserId: this.editBusinessManagerForm.get('UserId')?.value,
      Password: this.businessManager.Password //nunca cambia la contraseña, ya que el sistema la asigna
    }

    this.businessManagerService.update(this.businessManager.Email, updatedBusinessManagerData).subscribe({
      next: () => {
        //Si se procesa correctamente, se procesan los telefonos
        console.log('Business Manager actualizado');
        console.log(updatedBusinessManagerData)

        this.processPhoneChanges();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al actualizar Business Manager: ', err);
      }
    });
  }

  private processPhoneChanges(): void {
    const adminEmail = this.businessManager.Email;

    // Agregar nuevos teléfonos
    this.addedPhones.forEach(phone => {
      this.businessManagerService.createPhone(phone).subscribe({
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
      this.businessManagerService.updatePhone(adminEmail, oldPhone.Phone, { Phone: newPhone.Phone }).subscribe({
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
      this.businessManagerService.deletePhone(adminEmail, phone.Phone).subscribe({
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
}
