// edit-food-delivery-man.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FoodDeliveryManService, FoodDeliveryMan, FoodDeliveryManUpdate, FoodDeliveryManPhone, FoodDeliveryManPhoneUpdate } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { DialogCreateComponent } from '../../Login/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../../Login/dialog-edit/dialog-edit.component';
import { DialogConfirmComponent } from '../../ClientView/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-edit-food-delivery-man',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './edit-food-delivery-man.component.html',
  styleUrls: ['./edit-food-delivery-man.component.css']
})
export class EditFoodDeliveryManComponent implements OnInit {
  deliverymanForm!: FormGroup;
  phoneDataSource: number[] = [];
  displayedColumns: string[] = ['phone', 'edit', 'delete'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditFoodDeliveryManComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deliveryMan: FoodDeliveryMan },
    private foodDeliveryManService: FoodDeliveryManService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const deliveryMan = this.data.deliveryMan;

    // Inicializar el formulario con los datos del repartidor
    this.deliverymanForm = this.fb.group({
      UserId: [{ value: deliveryMan.UserId, disabled: true }, [Validators.required]],
      Name: [deliveryMan.Name, [Validators.required]],
      FirstSurname: [deliveryMan.FirstSurname, [Validators.required]],
      SecondSurname: [deliveryMan.SecondSurname, [Validators.required]],
      Province: [deliveryMan.Province, [Validators.required]],
      Canton: [deliveryMan.Canton, [Validators.required]],
      District: [deliveryMan.District, [Validators.required]],
      State: [deliveryMan.State, [Validators.required]], // Nuevo campo para el estado
      Password: ['', [Validators.minLength(6)]], // Opcional: Solo cambia si se ingresa una nueva contraseña
      ConfirmPassword: [''] // Opcional: Solo cambia si se ingresa una nueva contraseña
    }, { validators: this.passwordMatchValidator });

    // Cargar los teléfonos del repartidor
    this.loadPhones();
  }

  // Validación para que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    if (password || confirmPassword) { // Solo validar si alguno de los campos está lleno
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  // Cargar teléfonos desde el backend
  private loadPhones(): void {
    const userId = this.data.deliveryMan.UserId;
    this.foodDeliveryManService.getPhonesByUserId(userId).subscribe({
      next: (phones: FoodDeliveryManPhone[]) => {
        this.phoneDataSource = phones.map(phone => phone.Phone);
      },
      error: (error) => {
        this.openDialog('Error', 'Error al cargar los teléfonos');
        console.error('Error al cargar los teléfonos:', error);
      }
    });
  }

  // Manejar el envío del formulario (actualizar información del repartidor)
  onSubmit(): void {
    if (this.deliverymanForm.valid) {
      const userId = this.data.deliveryMan.UserId;
      const formValues = this.deliverymanForm.getRawValue();

      const deliveryManUpdate: FoodDeliveryManUpdate = {
        Name: formValues.Name,
        FirstSurname: formValues.FirstSurname,
        SecondSurname: formValues.SecondSurname,
        Province: formValues.Province,
        Canton: formValues.Canton,
        District: formValues.District,
        Password: formValues.Password ? formValues.Password : this.data.deliveryMan.Password, // Mantener la contraseña actual si no se cambia
        State: formValues.State
      };

      this.foodDeliveryManService.update(userId, deliveryManUpdate).subscribe({
        next: () => {
          this.openDialog('Éxito', 'Información del repartidor actualizada exitosamente');
          // Actualizar los datos locales del repartidor
          const updatedDeliveryMan: FoodDeliveryMan = {
            ...this.data.deliveryMan,
            ...deliveryManUpdate,
            FullName: `${deliveryManUpdate.Name} ${deliveryManUpdate.FirstSurname} ${deliveryManUpdate.SecondSurname}`,
            Direction: `${deliveryManUpdate.District}, ${deliveryManUpdate.Canton}, ${deliveryManUpdate.Province}`
          };
          this.data.deliveryMan = updatedDeliveryMan;
        },
        error: (error) => {
          this.openDialog('Error', 'Error al actualizar la información del repartidor');
          console.error('Error al actualizar la información del repartidor:', error);
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido. Por favor, revise los campos.');
    }
  }

  // Abrir diálogo genérico
  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }

  // Crear un nuevo teléfono
  onCreatePhone(): void {
    const userId = this.data.deliveryMan.UserId;
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.phoneDataSource.includes(result)) {
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
        }
        const newPhone: FoodDeliveryManPhone = {
          FoodDeliveryMan_UserId: userId,
          Phone: result
        };
        this.foodDeliveryManService.createPhone(newPhone).subscribe({
          next: () => {
            this.phoneDataSource = [...this.phoneDataSource, result];
          },
          error: (error) => {
            this.openDialog('Error', 'Error al agregar el teléfono');
            console.error('Error al agregar el teléfono:', error);
          }
        });
      }
    });
  }

  // Editar un teléfono existente
  onEditPhone(phone: number): void {
    const userId = this.data.deliveryMan.UserId;
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '400px',
      data: { phone }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPhone = result.newPhone;
        if (this.phoneDataSource.includes(newPhone) && newPhone !== phone) {
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
        }
        this.foodDeliveryManService.updatePhone(userId, phone, { Phone: newPhone }).subscribe({
          next: () => {
            const index = this.phoneDataSource.indexOf(phone);
            if (index !== -1) {
              this.phoneDataSource[index] = newPhone;
              this.phoneDataSource = [...this.phoneDataSource]; // Actualizar la referencia para que Angular detecte el cambio
            }
          },
          error: (error) => {
            this.openDialog('Error', 'Error al editar el teléfono');
            console.error('Error al editar el teléfono:', error);
          }
        });
      }
    });
  }

  // Eliminar un teléfono
  onDeletePhone(phone: number): void {
    const userId = this.data.deliveryMan.UserId;
    this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { title: 'Confirmar Eliminación', message: '¿Estás seguro de que deseas eliminar este teléfono?' }
    }).afterClosed().subscribe(result => {
      if (result) { // Asumiendo que el DialogComponent devuelve 'true' al confirmar
        this.foodDeliveryManService.deletePhone(userId, phone).subscribe({
          next: () => {
            this.phoneDataSource = this.phoneDataSource.filter(p => p !== phone);
          },
          error: (error) => {
            this.openDialog('Error', 'Error al eliminar el teléfono');
            console.error('Error al eliminar el teléfono:', error);
          }
        });
      }
    });
  }
}