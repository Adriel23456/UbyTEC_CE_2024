import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FoodDeliveryManService, FoodDeliveryManCreate, FoodDeliveryManPhone } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { DialogCreateComponent } from '../../Login/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../../Login/dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-create-food-delivery-man',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './create-food-delivery-man.component.html',
  styleUrls: ['./create-food-delivery-man.component.css']
})
export class CreateFoodDeliveryManComponent implements OnInit {
  deliverymanForm!: FormGroup;
  phoneDataSource: number[] = [];
  displayedColumns: string[] = ['phone', 'edit', 'delete'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFoodDeliveryManComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Puedes definir una interfaz para 'data' si es necesario
    private foodDeliveryManService: FoodDeliveryManService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario con validaciones
    this.deliverymanForm = this.fb.group({
      UserId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      FirstSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      SecondSurname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Province: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Canton: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      District: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validación para que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    if (this.deliverymanForm.valid) {
      if (this.phoneDataSource.length === 0) {
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
        State: "Disponible" // Puedes ajustar el estado por defecto según tus necesidades
      };

      // Crear el repartidor primero
      this.foodDeliveryManService.create(deliverymanData).subscribe({
        next: (deliveryMan) => {
          // Una vez creado el repartidor, crear los teléfonos
          this.createPhonesSequentially(deliveryMan.UserId, 0);
        },
        error: (error) => {
          this.openDialog('Error', 'Error al crear el repartidor');
          console.error('Error al crear el repartidor:', error);
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  // Método auxiliar para crear teléfonos de forma secuencial
  private createPhonesSequentially(userId: string, index: number): void {
    const phones = this.phoneDataSource;
    if (index >= phones.length) {
      this.openDialog('Registro Correcto', 'Se registró correctamente el nuevo repartidor')
          .afterClosed()
          .subscribe(() => {
            this.dialogRef.close(true); // Cerrar el diálogo y notificar éxito
          });
      return;
    }

    const phoneData: FoodDeliveryManPhone = {
      FoodDeliveryMan_UserId: userId,
      Phone: phones[index]
    };

    this.foodDeliveryManService.createPhone(phoneData).subscribe({
      next: () => {
        // Crear el siguiente teléfono
        this.createPhonesSequentially(userId, index + 1);
      },
      error: (error) => {
        this.openDialog('Error', 'Error al crear el teléfono');
        console.error('Error al crear el teléfono:', error);
      }
    });
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
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.phoneDataSource.includes(result)) {
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
        }
        this.phoneDataSource = [...this.phoneDataSource, result];
      }
    });
  }

  // Editar un teléfono existente
  onEditPhone(phone: number): void {
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '400px',
      data: { phone }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.phoneDataSource.indexOf(phone);
        if (this.phoneDataSource.includes(result.newPhone)) {
          this.openDialog('Error', 'Este número de teléfono ya existe');
          return;
        }
        this.phoneDataSource[index] = result.newPhone;
      }
    });
  }

  // Eliminar un teléfono
  onDeletePhone(phone: number): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.phoneDataSource = this.phoneDataSource.filter(p => p !== phone);
  }
}