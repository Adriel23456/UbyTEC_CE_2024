import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreateAssociatePhoneComponent } from '../create-associate-phone/create-associate-phone.component';
import { EditAssociatePhoneComponent } from '../edit-associate-phone/edit-associate-phone.component';
import { Observable, forkJoin, map } from 'rxjs';
import { BusinessAssociate, BusinessAssociatePhone, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessType, BusinessTypeService } from '../../../Services/BusinessType/business-type.service';
import { BusinessManager, BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-create-associate',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-associate.component.html',
  styleUrl: './create-associate.component.css'
})
export class CreateAssociateComponent {
  createBusinessAssociateForm!: FormGroup;
  tempPhones: BusinessAssociatePhone[] = [];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;

  businessTypes: BusinessType[] = [];
  businessAssociates: BusinessAssociate[] = [];
  unassociatedManagers: BusinessManager[] = [];
  acceptedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAssociateComponent>,
    private businessAssociateService: BusinessAssociateService,
    private businessManagerService: BusinessManagerService,
    private businessTypeService: BusinessTypeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.loadBusinessAssociates();
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
    this.getBusinessTypes().subscribe((types) => {
      this.businessTypes = types;  // se asigna el resultado a la variable businessTypes
    });
  }

  initForm(): void {
    this.createBusinessAssociateForm = this.fb.group({
      Legal_Id: ['', [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      BusinessName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      State: ['En espera'],
      SINPE: ['', [Validators.required, Validators.pattern(/^[0-9]{3,11}$/)]],
      BusinessType_Identification: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      BusinessManager_Email: ['', [Validators.required]]
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

      this.businessManagerService.getAll() // Obtener todos los administradores
    ]).pipe(
      map(([allManagers]) => {
        // Filtrar los administradores que no están asociados
        const unassociatedManagers = allManagers.filter(manager =>
          !this.businessAssociates.some(associate => associate.BusinessManager_Email === manager.Email)
        );
        return unassociatedManagers; // Devolver la lista de administradores no asociados
      })
    );
  }

  getBusinessTypes(): Observable<BusinessType[]> {
    return forkJoin([
      this.businessTypeService.getAll() // Obtener todos los tipos
    ]).pipe(
      map(([allTypes]) => {
        return allTypes; // Devolver la lista de tipos con la modificación
      })
    );
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
        // Actualiza el teléfono editado directamente en `tempPhones`
        const tempIndex = this.tempPhones.findIndex(p => p.Phone === previousPhone.Phone);
        if (tempIndex !== -1) {
          this.tempPhones[tempIndex] = result;
        }
      }
    })
  }

  deletePhone(phone: BusinessAssociatePhone): void {
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
    const adminIdControl = this.createBusinessAssociateForm.get('Legal_Id');

    if (!adminIdControl || adminIdControl.invalid) {
      // Mostrar un mensaje de advertencia o manejar el error
      this.showErrorDialog('Por favor, ingrese una cédula válida antes de agregar un teléfono.');
      return;
    }

    const adminId = adminIdControl.value;

    const dialogRef = this.dialog.open(CreateAssociatePhoneComponent, {
      width: '400px',
      data: { legalId: adminId, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
      }
    })
  }

  createBusinessAsociate(): void {
    const newBusinessAssociateData = this.createBusinessAssociateForm.value;

    // Verificar unicidad del Legal_Id y BusinessName
    const isLegalIdTaken = this.businessAssociates.some(associate => associate.Legal_Id === newBusinessAssociateData.Legal_Id);
    const isEmailTaken = this.businessAssociates.some(associate => associate.Email === newBusinessAssociateData.Email);
    const isBusinessNameTaken = this.businessAssociates.some(associate => associate.BusinessName === newBusinessAssociateData.BusinessName);

    if (isLegalIdTaken) {
      this.showErrorDialog('La cédula jurídica ya está en uso. Por favor, ingresa una diferente.');
      return;
    }

    if (isEmailTaken) {
      this.showErrorDialog('El correo ya fue registrado por otra empresa. Por favor, ingresa uno distinto.');
      return;
    }

    if (isBusinessNameTaken) {
      this.showErrorDialog('El nombre del negocio ya está en uso. Por favor, ingresa uno diferente.');
      return;
    }

    // Verificar si el correo tiene un dominio permitido
    const email = newBusinessAssociateData.Email;
    const domain = email.split('@')[1]; // Extraer el dominio del correo

    if (!this.acceptedDomains.includes(domain)) {
      console.error();
      this.showErrorDialog('El dominio del correo no es válido. El correo debe pertenecer a uno de los siguientes dominios: ' + this.acceptedDomains.join(', '));
      return;
    }

    // Crear el administrador
    this.businessAssociateService.create(newBusinessAssociateData).subscribe({
      next: () => {
        console.log('Negocio creado exitosamente:');
        console.log(newBusinessAssociateData);

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
      this.businessAssociateService.createPhone(phone).subscribe({
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
