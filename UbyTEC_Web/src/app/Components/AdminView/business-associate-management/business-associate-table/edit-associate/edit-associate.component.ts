import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BusinessAssociate, BusinessAssociateService, BusinessAssociatePhone, BusinessAssociateUpdate } from '../../../../../Services/BusinessAssociate/business-associate.service';
import { BusinessManager, BusinessManagerService } from '../../../../../Services/BusinessManager/business-manager.service';
import { BusinessType, BusinessTypeService } from '../../../../../Services/BusinessType/business-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateAssociatePhoneComponent } from '../create-associate-phone/create-associate-phone.component';
import { EditAssociatePhoneComponent } from '../edit-associate-phone/edit-associate-phone.component';
import { isIdentifierOrThisTypeNode } from 'typescript';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-edit-business-associate',
  templateUrl: './edit-associate.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-associate.component.css']
})

export class EditAssociateComponent implements OnInit {
  businessAssociate!: BusinessAssociate;
  editBusinessAssociateForm!: FormGroup;
  tempPhones: BusinessAssociatePhone[] = [];
  addedPhones: BusinessAssociatePhone[] = [];
  editedPhones: [BusinessAssociatePhone, BusinessAssociatePhone][] = [];
  deletedPhones: BusinessAssociatePhone[] = [];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;
  businessTypes: BusinessType[] = [];
  businessManagers: BusinessManager[] = [];
  businessAssociates: BusinessAssociate[] = [];
  unassociatedManagers: BusinessManager[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAssociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { businessAssociate: BusinessAssociate },
    private businessAssociateService: BusinessAssociateService,
    private businessManagerService: BusinessManagerService,
    private businessTypeService: BusinessTypeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.businessAssociate = { ...this.data.businessAssociate };
    this.loadBusinessAssociates();
    this.loadPhones();
    this.loadTypes();
    this.loadUnassociatedManagers();

    this.initForm();
  }

  loadUnassociatedManagers(): void {
    this.getUnassociatedManagers().subscribe((managers) => {
      this.unassociatedManagers = managers;  // se asigna el resultado a la variable unassociatedManagers
    });
  }

  loadTypes(): void {
    this.getBusinessTypesWithCurrent().subscribe((types) => {
      this.businessTypes = types;  // se asigna el resultado a la variable businessTypes
    });
  }

  initForm(): void {
    this.editBusinessAssociateForm = this.fb.group({
      Legal_Id: [{ value: this.businessAssociate.Legal_Id, disabled: true }],
      BusinessName: [this.businessAssociate.BusinessName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: [this.businessAssociate.Province, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: [this.businessAssociate.Canton, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: [this.businessAssociate.District, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      State: [this.businessAssociate.State, [Validators.required]],
      SINPE: [this.businessAssociate.SINPE, [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      BusinessType_Identification: [this.businessAssociate.BusinessType_Identification, [Validators.required]],
      Email: [this.businessAssociate.Email, [Validators.required]], //TODO: VALIDACION DE EMAIL 
      BusinessManager_Email: [this.businessAssociate.BusinessManager_Email, [Validators.required]]
    });
  }

  loadBusinessAssociates(): void {
    this.businessAssociateService.getAll().subscribe({
      next: (data: BusinessAssociate[]) => {
        const businessAssociates = data;
        this.businessAssociates = businessAssociates;
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
    });
  }

  //funcion para solo mostrar los administradores que no estan asociados a un negocio afiliado
  getUnassociatedManagers(): Observable<BusinessManager[]> {
    return forkJoin([
      this.businessManagerService.getByEmail(this.businessAssociate.BusinessManager_Email), // Obtener el administrador actual
      this.businessManagerService.getAll() // Obtener todos los administradores
    ]).pipe(
      map(([currentManager, allManagers]) => {
        // Filtrar los administradores que no están asociados
        const unassociatedManagers = allManagers.filter(manager =>
          !this.businessAssociates.some(associate => associate.BusinessManager_Email === manager.Email)
        );

        // Crear una copia del administrador actual con la modificación
        const actualManagerWithModification: BusinessManager = {
          ...currentManager,
          FullName: `${currentManager.FullName} (Actual)`
        };

        // Agregar el administrador actual modificado a la lista de no asociados si no está ya incluido
        if (!unassociatedManagers.some(manager => manager.Email === currentManager.Email)) {
          unassociatedManagers.push(actualManagerWithModification);
        }

        return unassociatedManagers; // Devolver la lista de administradores no asociados
      })
    );
  }

  getBusinessTypesWithCurrent(): Observable<BusinessType[]> {
    return forkJoin([
      this.businessTypeService.getById(this.businessAssociate.BusinessType_Identification), // Obtener el tipo actual
      this.businessTypeService.getAll() // Obtener todos los tipos
    ]).pipe(
      map(([currentType, allTypes]) => {
        // Crear una copia del tipo actual con la modificación
        const currentTypeWithModification: BusinessType = {
          ...currentType,
          Name: `${currentType.Name} (Actual)`
        };
  
        // Agregar el tipo actual modificado a la lista
        const typesWithCurrent = allTypes.map(type => 
          type.Identification === currentType.Identification ? currentTypeWithModification : type
        );
  
        return typesWithCurrent; // Devolver la lista de tipos con la modificación
      })
    );
  }
  
  loadPhones(): void {
    this.businessAssociateService.getPhonesByLegalId(this.businessAssociate.Legal_Id).subscribe(phones => {
      this.tempPhones = phones;
      this.totalPhonePages = Math.ceil(phones.length / 1); // 1 teléfono por página
    });
  }

  //Paginación 

  getPhonesForCurrentPage(): BusinessAssociatePhone[] {
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

  editPhone(previousPhone: BusinessAssociatePhone): void {
    const dialogRef = this.dialog.open(EditAssociatePhoneComponent, {
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

  deletePhone(phone: BusinessAssociatePhone): void {
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
    const dialogRef = this.dialog.open(CreateAssociatePhoneComponent, {
      width: '400px',
      data: { legalId: this.businessAssociate.Legal_Id, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.addedPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1)
      }
    });
  }

  updateBusinessAssociate(): void {

    const updatedAssociate: BusinessAssociateUpdate = {
      Email: this.editBusinessAssociateForm.get('Email')?.value,
      State: this.editBusinessAssociateForm.get('State')?.value,
      BusinessName: this.editBusinessAssociateForm.get('BusinessName')?.value,
      Province: this.editBusinessAssociateForm.get('Province')?.value,
      Canton: this.editBusinessAssociateForm.get('Canton')?.value,
      District: this.editBusinessAssociateForm.get('District')?.value,
      SINPE: this.editBusinessAssociateForm.get('SINPE')?.value,
      RejectReason: this.businessAssociate.RejectReason,
      BusinessManager_Email: this.editBusinessAssociateForm.get('BusinessManager_Email')?.value,
      BusinessType_Identification: this.editBusinessAssociateForm.get('BusinessType_Identification')?.value,
    }

    this.businessAssociateService.update(this.businessAssociate.Legal_Id, updatedAssociate).subscribe({
      next: () => {
        //Si se procesa correctamente, se procesan los telefonos
        console.log('Business Manager actualizado');
        console.log(updatedAssociate)

        this.processPhoneChanges();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al actualizar Business Manager: ', err);
      }
    });
  }

  private processPhoneChanges(): void {
    const associateLegalID = this.businessAssociate.Legal_Id;

    // Agregar nuevos teléfonos
    this.addedPhones.forEach(phone => {
      this.businessAssociateService.createPhone(phone).subscribe({
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
      this.businessAssociateService.updatePhone(associateLegalID, oldPhone.Phone, { Phone: newPhone.Phone }).subscribe({
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
      this.businessAssociateService.deletePhone(associateLegalID, phone.Phone).subscribe({
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

