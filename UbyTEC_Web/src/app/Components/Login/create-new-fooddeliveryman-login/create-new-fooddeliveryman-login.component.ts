import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
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
import { FoodDeliveryManService, FoodDeliveryManCreate, FoodDeliveryManPhone } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-new-fooddeliveryman-login',
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
  templateUrl: './create-new-fooddeliveryman-login.component.html',
  styleUrls: ['./create-new-fooddeliveryman-login.component.css']
})
export class CreateNewFooddeliverymanLoginComponent {
  deliverymanForm: FormGroup;
  phoneDataSource = new MatTableDataSource<number>([]);
  displayedColumns: string[] = ['phone', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private deliverymanService: FoodDeliveryManService,
    private router: Router
  ) {
    this.deliverymanForm = this.fb.group({
      UserId: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      Name: ['', Validators.required],
      FirstSurname: ['', Validators.required],
      SecondSurname: ['', Validators.required],
      Province: ['', Validators.required],
      Canton: ['', Validators.required],
      District: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
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
    if (this.deliverymanForm.valid) {
      if (this.phoneDataSource.data.length === 0) {
        this.openDialog('Error', 'Debe agregar al menos un teléfono');
        return;
      }
      const deliverymanData: FoodDeliveryManCreate = {
        UserId: this.deliverymanForm.value.UserId,
        Name: this.deliverymanForm.value.Name,
        FirstSurname: this.deliverymanForm.value.FirstSurname,
        SecondSurname: this.deliverymanForm.value.SecondSurname,
        Province: this.deliverymanForm.value.Province,
        Canton: this.deliverymanForm.value.Canton,
        District: this.deliverymanForm.value.District,
        Password: this.deliverymanForm.value.Password,
        State: "No disponible"
      };
      // Crear el repartidor primero
      this.deliverymanService.create(deliverymanData).subscribe({
        next: (deliveryMan) => {
          // Una vez creado el repartidor, crear el primer teléfono
          this.createNextPhone(deliveryMan.UserId, 0);
        },
        error: (error) => {
          this.openDialog('Error', 'Error al crear el repartidor');
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  // Método auxiliar para crear teléfonos de forma secuencial
  private createNextPhone(userId: string, index: number): void {
    const phones = this.phoneDataSource.data;
    // Si ya procesamos todos los teléfonos, mostrar éxito
    if (index >= phones.length) {
      this.openDialog('Registro correcto', 'Se registró correctamente el nuevo repartidor')
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      return;
    }
    // Crear el teléfono actual
    const phoneData: FoodDeliveryManPhone = {
      FoodDeliveryMan_UserId: userId,
      Phone: phones[index]
    };
    this.deliverymanService.createPhone(phoneData).subscribe({
      next: () => {
        // Crear el siguiente teléfono
        this.createNextPhone(userId, index + 1);
      },
      error: (error) => {
        this.openDialog('Error', 'Error al crear el teléfono');
      }
    });
  }

  onReturn(): void {
    this.router.navigate(['/login']);
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
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
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
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
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