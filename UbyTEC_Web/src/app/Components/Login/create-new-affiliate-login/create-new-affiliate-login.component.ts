import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { BusinessManagerService, BusinessManagerCreate, BusinessManagerPhone } from '../../../Services/BusinessManager/business-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-create-new-affiliate-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './create-new-affiliate-login.component.html',
  styleUrls: ['./create-new-affiliate-login.component.css']
})
export class CreateNewAffiliateLoginComponent {
  managerForm: FormGroup;
  phoneDataSource = new MatTableDataSource<number>([]);
  displayedColumns: string[] = ['phone', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private managerService: BusinessManagerService,
    private router: Router
  ) {
    this.managerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      UserId: ['', Validators.required],
      Name: ['', Validators.required],
      FirstSurname: ['', Validators.required],
      SecondSurname: ['', Validators.required],
      Province: ['', Validators.required],
      Canton: ['', Validators.required],
      District: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.managerForm.valid) {
      if (this.phoneDataSource.data.length === 0) {
        this.openDialog('Error', 'Debe agregar al menos un teléfono')
          .afterClosed()
          .subscribe(() => {
            return;
          });
      }

      // Generar contraseña aleatoria
      const randomPassword = Math.random().toString(36).slice(-8);

      const managerData: BusinessManagerCreate = {
        Email: this.managerForm.value.Email,
        UserId: this.managerForm.value.UserId,
        Name: this.managerForm.value.Name,
        FirstSurname: this.managerForm.value.FirstSurname,
        SecondSurname: this.managerForm.value.SecondSurname,
        Province: this.managerForm.value.Province,
        Canton: this.managerForm.value.Canton,
        District: this.managerForm.value.District,
        Password: randomPassword
      };

      // Crear el administrador primero
      this.managerService.create(managerData).subscribe({
        next: (manager) => {
          // Una vez creado el administrador, crear el primer teléfono
          this.createNextPhone(manager.Email, 0, manager);
        },
        error: (error) => {
          this.openDialog('Error', 'Error al crear el administrador');
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  // Método auxiliar para crear teléfonos de forma secuencial
  private createNextPhone(email: string, index: number, manager: any): void {
    const phones = this.phoneDataSource.data;
    // Si ya procesamos todos los teléfonos, enviar el correo y mostrar éxito
    if (index >= phones.length) {
      // Enviar email con la contraseña
      const templateParams = {
        from_name: 'UbyTEC_CE',
        to_name: manager.FullName,
        to_email: manager.Email,
        password: manager.Password,
        reply_to: 'noreply@ubytec_ce.com'
      };
      emailjs.send('service_5ejt4rh', 'template_ovk7hrp', templateParams, 'qUD-Q_YPdWb-wQtEl')
        .then(() => {
          this.openDialog('Registro correcto', 'Se registró correctamente el nuevo administrador de negocio y se ha enviado la contraseña al correo proporcionado.');
        })
        .catch(() => {
          this.openDialog('Advertencia', 'El administrador se registró correctamente pero hubo un error al enviar el correo con la contraseña.');
        });
      return;
    }
    // Crear el teléfono actual
    const phoneData: BusinessManagerPhone = {
      BusinessManager_Email: email,
      Phone: phones[index]
    };
    this.managerService.createPhone(phoneData).subscribe({
      next: () => {
        // Crear el siguiente teléfono
        this.createNextPhone(email, index + 1, manager);
      },
      error: (error) => {
        this.openDialog('Error', 'Error al crear el teléfono');
      }
    });
  }

  onReturn(): void {
    this.router.navigate(['/login']);
  }

  onAssignBusiness(): void {
    this.router.navigate(['/loginCreateNewBusiness']);
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }

  onCreatePhone(): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const phones = this.phoneDataSource.data;
        if (phones.includes(result)) {
          this.openDialog('Error', 'Este número de teléfono ya existe')
          .afterClosed()
          .subscribe(() => {
            return;
          });
        }
        this.phoneDataSource.data = [...phones, result];
      }
    });
  }

  onEditPhone(phone: number): void {
    // Prevenir la validación del formulario principal
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '400px',
      data: { phone }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const phones = this.phoneDataSource.data;
        const index = phones.indexOf(phone);
        if (phones.includes(result.newPhone)) {
          this.openDialog('Error', 'Este número de teléfono ya existe')
          .afterClosed()
          .subscribe(() => {
            return;
          });
        }
        phones[index] = result.newPhone;
        this.phoneDataSource.data = [...phones];
      }
    });
  }

  onDeletePhone(phone: number): void {
    const phones = this.phoneDataSource.data.filter(p => p !== phone);
    this.phoneDataSource.data = phones;
  }
}