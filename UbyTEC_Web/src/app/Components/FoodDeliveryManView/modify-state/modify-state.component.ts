import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { FoodDeliveryManService, FoodDeliveryManUpdate } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-modify-state',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatMomentDateModule
  ],
  templateUrl: './modify-state.component.html',
  styleUrls: ['./modify-state.component.css']
})
export class ModifyStateComponent implements OnInit {
  stateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private foodDeliveryManService: FoodDeliveryManService,
    private router: Router,
    private dateAdapter: DateAdapter<any>
  ) {
    // Configura el adaptador de fecha
    this.dateAdapter.setLocale('es-ES');

    this.stateForm = this.fb.group({
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const currentDeliveryMan = this.foodDeliveryManService.currentDeliveryManValue;
    if (!currentDeliveryMan) {
      this.openDialog('Error', 'No hay repartidor autenticado. Por favor, inicie sesión nuevamente.')
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }
    // Pre-cargar el estado actual en el formulario
    this.stateForm.patchValue({
      state: currentDeliveryMan.State
    });
  }

  onSubmit(): void {
    if (this.stateForm.valid) {
      const currentDeliveryMan = this.foodDeliveryManService.currentDeliveryManValue;
      if (!currentDeliveryMan) {
        this.openDialog('Error', 'No hay repartidor autenticado.')
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
        return;
      }

      const newState = this.stateForm.get('state')?.value;

      const deliveryManUpdate: FoodDeliveryManUpdate = {
        Name: currentDeliveryMan.Name,
        FirstSurname: currentDeliveryMan.FirstSurname,
        SecondSurname: currentDeliveryMan.SecondSurname,
        Province: currentDeliveryMan.Province,
        Canton: currentDeliveryMan.Canton,
        District: currentDeliveryMan.District,
        Password: currentDeliveryMan.Password,
        State: newState
      };

      this.foodDeliveryManService.update(currentDeliveryMan.UserId, deliveryManUpdate).subscribe({
        next: () => {
          this.openDialog('Actualización correcta', 'Se actualizó correctamente el estado.')
            .afterClosed()
            .subscribe(() => {
              location.reload();
            });
        },
        error: (err) => {
          this.openDialog('Error', 'Error al actualizar el estado.');
        }
      });
    } else {
      this.openDialog('Error', 'Formulario inválido');
    }
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}