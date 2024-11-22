import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { ClientService, ClientUpdate } from '../../../Services/Client/client.service';
import moment from 'moment';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  clientForm: FormGroup;
  formattedDate: string = '';
  currentPassword: string = '';

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private dateAdapter: DateAdapter<any>
  ) {
    // Configura el adaptador de fecha
    this.dateAdapter.setLocale('es-ES');

    this.clientForm = this.fb.group({
      UserId: ['', Validators.required],
      CurrentPassword: ['', Validators.required],
      NewPassword: ['', Validators.minLength(6)],
      BirthDate: ['', Validators.required],
      FullName: this.fb.group({
        Name: ['', Validators.required],
        FirstSurname: ['', Validators.required],
        SecondSurname: ['', Validators.required]
      }),
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Province: ['', Validators.required],
      Canton: ['', Validators.required],
      District: ['', Validators.required]
    });
  }

  ngOnInit() {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.openDialog('Error', 'No hay cliente autenticado. Por favor, inicie sesión nuevamente.')
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }

    // Almacena la contraseña actual para uso interno
    this.currentPassword = currentClient.Password;

    // Pre-cargar los datos del cliente en el formulario
    this.clientForm.patchValue({
      UserId: currentClient.UserId,
      CurrentPassword: currentClient.Password,
      NewPassword: '',
      BirthDate: moment(currentClient.BirthDate, 'DD-MM-YYYY'),
      FullName: {
        Name: currentClient.Name,
        FirstSurname: currentClient.FirstSurname,
        SecondSurname: currentClient.SecondSurname
      },
      Phone: currentClient.Phone.toString(),
      Province: currentClient.Province,
      Canton: currentClient.Canton,
      District: currentClient.District
    });

    this.formattedDate = currentClient.BirthDate;

    // Escuchar cambios en el campo de fecha
    this.clientForm.get('BirthDate')?.valueChanges.subscribe(value => {
      if (value) {
        const momentDate = moment(value);
        if (momentDate.isValid()) {
          this.formattedDate = momentDate.format('DD-MM-YYYY');
        }
      }
    });
  }

  onDateChange(event: any): void {
    if (event.value) {
      const formattedDate = moment(event.value).format('DD-MM-YYYY');
      this.clientForm.patchValue({
        BirthDate: moment(formattedDate, 'DD-MM-YYYY')
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const currentClient = this.clientService.currentClientValue;
      if (!currentClient) {
        this.openDialog('Error', 'No hay cliente autenticado.')
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
        return;
      }

      // Determinar la contraseña a actualizar
      let updatedPassword = this.currentPassword;
      if (this.clientForm.get('NewPassword')?.value) {
        updatedPassword = this.clientForm.get('NewPassword')?.value;
      }

      const clientUpdate: ClientUpdate = {
        UserId: this.clientForm.value.UserId,
        Name: this.clientForm.value.FullName.Name,
        FirstSurname: this.clientForm.value.FullName.FirstSurname,
        SecondSurname: this.clientForm.value.FullName.SecondSurname,
        Province: this.clientForm.value.Province,
        Canton: this.clientForm.value.Canton,
        District: this.clientForm.value.District,
        Password: updatedPassword,
        Phone: parseInt(this.clientForm.value.Phone, 10),
        BirthDate: this.formattedDate
      };

      this.clientService.update(currentClient.Id, clientUpdate).subscribe({
        next: () => {
          this.openDialog('Actualización correcta', 'Se actualizó correctamente la información del cliente.')
            .afterClosed()
            .subscribe(() => {
              location.reload();
            });
        },
        error: (err) => {
          this.openDialog('Error', 'Error al actualizar la información del cliente.');
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar eliminación', 
        message: '¿Está seguro de que desea eliminar su cuenta?' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const currentClient = this.clientService.currentClientValue;
        if (!currentClient) {
          this.openDialog('Error', 'No hay cliente autenticado.')
            .afterClosed()
            .subscribe(() => {
              this.router.navigate(['/login']);
            });
          return;
        }

        this.clientService.delete(currentClient.Id).subscribe({
          next: () => {
            this.openDialog('Eliminación correcta', 'El cliente ha sido eliminado correctamente.')
              .afterClosed()
              .subscribe(() => {
                this.router.navigate(['/login']);
              });
          },
          error: (err) => {
            this.openDialog('Error', 'Error al eliminar el cliente, recordar que si el cliente ya posee alguna orden a su nombre, este ya no se puede eliminar.');
          }
        });
      }
    });
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}