import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateBusinessManagerPhoneComponent } from '../create-business-manager-phone/create-business-manager-phone.component';
import { EditBusinessManagerPhoneComponent } from '../edit-business-manager-phone/edit-business-manager-phone.component';
import { CommonModule } from '@angular/common';
import { BusinessManager, BusinessManagerPhone, BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import emailjs from '@emailjs/browser';
import { DialogComponent } from '../../Login/dialog/dialog.component';

@Component({
  selector: 'app-create-business-manager',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-business-manager.component.html',
  styleUrl: './create-business-manager.component.css'
})
export class CreateBusinessManagerComponent {
  createBusinessManagerForm!: FormGroup;
  tempPhones: BusinessManagerPhone[] = [];
  businessManagers!: BusinessManager[];
  currentPhonePage: number = 1;
  totalPhonePages: number = 1;
  acceptedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBusinessManagerComponent>,
    private businessManagerService: BusinessManagerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadBusinessManagers();

    // Crear el formulario con validaciones
    this.createBusinessManagerForm = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      UserId: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: [null],
    });
  }


  loadBusinessManagers(): void {
    this.businessManagerService.getAll().subscribe({
      next: (data: BusinessManager[]) => {
        const businessManagers = data;
        this.businessManagers = businessManagers;
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
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
        // Actualiza el teléfono editado directamente en `tempPhones`
        const tempIndex = this.tempPhones.findIndex(p => p.Phone === previousPhone.Phone);
        if (tempIndex !== -1) {
          this.tempPhones[tempIndex] = result;
        }
      }
    })
  }

  deletePhone(phone: BusinessManagerPhone): void {
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
    const businessManagerEmailControl = this.createBusinessManagerForm.get('Email');

    if (!businessManagerEmailControl || businessManagerEmailControl.invalid) {
      // Mostrar un mensaje de advertencia o manejar el error
      this.showErrorDialog('Por favor, ingrese un correo válido antes de agregar un teléfono.');
      return;
    }

    const businessManagerEmail = businessManagerEmailControl.value;

    const domain = businessManagerEmail.split('@')[1]; // Extraer el dominio del correo
    if (!this.acceptedDomains.includes(domain)) {
      console.error();
      this.showErrorDialog('El dominio del correo no es válido. El correo debe pertenecer a uno de los siguientes dominios: ' + this.acceptedDomains.join(', '));
      return;
    }

    const dialogRef = this.dialog.open(CreateBusinessManagerPhoneComponent, {
      width: '400px',
      data: { Email: businessManagerEmail, phones: this.tempPhones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tempPhones.push(result);
        this.totalPhonePages = Math.ceil(this.tempPhones.length / 1);
      }
    })
  }

  createBusinessManager(): void {
    // Copia los datos del formulario y asigna la contraseña aleatoria
    const newBusinessAssociateData = { ...this.createBusinessManagerForm.value }; // Copia del formulario
    newBusinessAssociateData.Password = this.generateRandomPassword(); // Asignar contraseña aleatoria
    // Verificar si el correo tiene un dominio permitido
    const email = newBusinessAssociateData.Email;
    const domain = email.split('@')[1]; // Extraer el dominio del correo
    if (!this.acceptedDomains.includes(domain)) {
      console.error();
      this.showErrorDialog('El dominio del correo no es válido. El correo debe pertenecer a uno de los siguientes dominios: ' + this.acceptedDomains.join(', '));
      return;
    }
    // Verificar unicidad del Email y el userID
    const isEmailTaken = this.businessManagers.some(manager => manager.Email === newBusinessAssociateData.Email);
    const isUserTaken = this.businessManagers.some(manager => manager.UserId === newBusinessAssociateData.UserId);
    if (isEmailTaken) {
      this.showErrorDialog('El correo ya está en uso. Por favor, ingresa uno diferente.');
      return;
    }
    if (isUserTaken) {
      this.showErrorDialog('El usuario ya está en uso. Por favor, ingresa uno diferente.');
      return;
    }
    // Crear el administrador
    this.businessManagerService.create(newBusinessAssociateData).subscribe({
      next: () => {
        console.log('Administrador creado exitosamente:');
        console.log(newBusinessAssociateData);

        this.processPhones();
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al crear administrador:', err);
      }
    });
    const templateParams = {
      from_name: 'UbyTEC_CE',
      to_name: newBusinessAssociateData.FullName,
      to_email: newBusinessAssociateData.Email,
      password: newBusinessAssociateData.Password,
      reply_to: 'noreply@ubytec_ce.com'
    };
    emailjs.send('service_5ejt4rh', 'template_ovk7hrp', templateParams, 'qUD-Q_YPdWb-wQtEl')
      .then(() => {
        this.openDialog('Registro correcto', 'Se registró correctamente el nuevo administrador de negocio y se ha enviado la contraseña al correo proporcionado.');
      })
      .catch(() => {
        this.openDialog('Advertencia', 'El administrador se registró correctamente pero hubo un error al enviar el correo con la contraseña.');
      });
  }

  private processPhones(): void {
    // Agregar los nuevos teléfonos
    this.tempPhones.forEach(phone => {
      this.businessManagerService.createPhone(phone).subscribe({
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

  generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}
