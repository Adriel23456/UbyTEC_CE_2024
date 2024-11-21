import { Component, OnInit } from '@angular/core';
import { FoodDeliveryManService, FoodDeliveryMan } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogAdminComponent } from '../delete-dialog-admin/delete-dialog-admin.component'; // Si existe uno similar
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { CreateFoodDeliveryManComponent } from '../create-food-delivery-man/create-food-delivery-man.component';
import { EditFoodDeliveryManComponent } from '../edit-food-delivery-man/edit-food-delivery-man.component';

@Component({
  selector: 'app-food-delivery-man-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './food-delivery-man-management.component.html',
  styleUrls: ['./food-delivery-man-management.component.css']
})
export class FoodDeliveryManManagementComponent implements OnInit {
  foodDeliveryMen: FoodDeliveryMan[] = [];
  filteredFoodDeliveryMen: FoodDeliveryMan[] = [];
  totalFoodDeliveryMen: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  filterText: string = '';

  constructor(
    private foodDeliveryManService: FoodDeliveryManService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFoodDeliveryMen();
  }

  // Carga inicial de repartidores
  private loadFoodDeliveryMen(): void {
    this.foodDeliveryManService.getAll().subscribe({
      next: (data: FoodDeliveryMan[]) => {
        this.foodDeliveryMen = data;
        this.filteredFoodDeliveryMen = data;
        this.totalFoodDeliveryMen = data.length;
        this.totalPages = Math.ceil(this.totalFoodDeliveryMen / this.pageSize);
      },
      error: (err) => console.error('Error al cargar repartidores:', err)
    });
  }

  // Filtrado de repartidores
  onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredFoodDeliveryMen = this.foodDeliveryMen.filter(deliveryMan => 
      deliveryMan.FullName.toLowerCase().includes(this.filterText)
    );
    this.totalFoodDeliveryMen = this.filteredFoodDeliveryMen.length;
    this.totalPages = Math.ceil(this.totalFoodDeliveryMen / this.pageSize);
    this.currentPage = 1; // Reinicia a la primera página del filtro
  }

  // Obtener los repartidores para la página actual
  getFoodDeliveryMenForCurrentPage(): FoodDeliveryMan[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredFoodDeliveryMen.slice(startIndex, endIndex);
  }

  // Navegar a la página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navegar a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Crear un nuevo repartidor
  createDeliveryMan(): void {
    const dialogRef = this.dialog.open(CreateFoodDeliveryManComponent, {
      width: '800px', // Ajusta el ancho según sea necesario
      disableClose: false, // Permitir cerrar el diálogo haciendo clic fuera de él
      data: {} // Puedes pasar datos al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadFoodDeliveryMen();
    });
  }

  // Editar un repartidor existente
  editDeliveryMan(deliveryMan: FoodDeliveryMan): void {
    const dialogRef = this.dialog.open(EditFoodDeliveryManComponent, {
      width: '800px', // Ajusta el ancho según sea necesario
      disableClose: false, // Permitir cerrar el diálogo haciendo clic fuera de él
      data: { deliveryMan } // Pasar los datos del repartidor al diálogo
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFoodDeliveryMen();
    });
  }

  // Eliminar un repartidor
  deleteDeliveryMan(deliveryMan: FoodDeliveryMan): void {
    const dialogRef = this.dialog.open(DeleteDialogAdminComponent, {
      width: '400px',
      data: { message: `¿Estás seguro de que deseas eliminar a ${deliveryMan.FullName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(deliveryMan.UserId === "EsperandoRepartidor"){
          this.openDialog('Eliminación Cancelada', `${deliveryMan.UserId} es un repartidor predeterminado que no se puede eliminar.`);
          return;
        } else{
          this.foodDeliveryManService.delete(deliveryMan.UserId).subscribe({
            next: () => {
              this.foodDeliveryMen = this.foodDeliveryMen.filter(dm => dm.UserId !== deliveryMan.UserId);
              this.filteredFoodDeliveryMen = this.filteredFoodDeliveryMen.filter(dm => dm.UserId !== deliveryMan.UserId);
              this.totalFoodDeliveryMen = this.filteredFoodDeliveryMen.length;
              this.totalPages = Math.ceil(this.totalFoodDeliveryMen / this.pageSize);
              this.openDialog('Eliminación Exitosa', `${deliveryMan.FullName} ha sido eliminado exitosamente.`);
            },
            error: (err) => {
              console.error('Error al eliminar repartidor:', err);
              this.openDialog('Error', 'Hubo un problema al eliminar el repartidor.');
            }
          });
        }
      }
    });
  }

  // Función para abrir diálogos genéricos
  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}