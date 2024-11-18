import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ClientService, ClientCreate } from '../../../Services/Client/client.service';
import moment from 'moment';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-new-client-login',
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
  templateUrl: './create-new-client-login.component.html',
  styleUrls: ['./create-new-client-login.component.css']
})
export class CreateNewClientLoginComponent implements OnInit {
  clientForm: FormGroup;
  formattedDate: string = '';

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
      Id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      UserId: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      FullName: this.fb.group({
        Name: ['', Validators.required],
        FirstSurname: ['', Validators.required],
        SecondSurname: ['', Validators.required]
      }),
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Province: ['', Validators.required],
      Canton: ['', Validators.required],
      District: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
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

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData: ClientCreate = {
        Id: parseInt(this.clientForm.value.Id, 10),
        UserID: this.clientForm.value.UserId,
        Name: this.clientForm.value.FullName.Name,
        FirstSurname: this.clientForm.value.FullName.FirstSurname,
        SecondSurname: this.clientForm.value.FullName.SecondSurname,
        Province: this.clientForm.value.Province,
        Canton: this.clientForm.value.Canton,
        District: this.clientForm.value.District,
        Password: this.clientForm.value.Password,
        Phone: parseInt(this.clientForm.value.Phone, 10),
        BirthDate: this.formattedDate
      };
      this.clientService.create(clientData).subscribe({
        next: () => {
          this.openDialog('Registro correcto', 'Se registró correctamente el nuevo cliente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.openDialog('Error', 'Error al crear el cliente');
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  onReturn(): void {
    this.router.navigate(['/login']);
  }

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}