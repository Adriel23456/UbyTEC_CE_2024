import { Component } from '@angular/core';
import { BusinessTypeService, BusinessType } from '../../../Services/BusinessType/business-type.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { EditBusinessTypeComponent } from './edit-business-type/edit-business-type.component'
import { CreateBusinessTypeComponent } from './create-business-type/create-business-type.component';
import { BusinessAssociateService, BusinessAssociate } from '../../../Services/BusinessAssociate/business-associate.service'
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'app-business-type-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './business-type-management.component.html',
  styleUrl: './business-type-management.component.css'
})
export class BusinessTypeManagementComponent {
  types: BusinessType[] = [];
  filteredTypes: BusinessType[] = [];
  businessAssociates: BusinessAssociate[] = [];
  totalTypes: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  filterText: string = '';

  constructor(
    private businessTypeService: BusinessTypeService,
    private businessAssociateService: BusinessAssociateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTypes();
    this.loadBusinessAssociates();
  }

  // Carga inicial de tipos
  private loadTypes(): void {
    this.businessTypeService.getAll().subscribe({
      next: (data: BusinessType[]) => {
        this.types = data;
        this.filteredTypes = data;
        this.totalTypes = data.length;
        this.totalPages = Math.ceil(this.totalTypes / this.pageSize); // Calcular el total de páginas
      },
      error: (err) => console.error('Error al cargar administradores:', err)
    });
  }

  loadBusinessAssociates(): void {
    this.businessAssociateService.getAll().subscribe({
      next: (data: BusinessAssociate[]) => {
        this.businessAssociates = data;
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
    });
  }

  // Filtrado de tipos
  onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredTypes = this.types.filter(type =>
      type.Name.toLowerCase().includes(this.filterText) ||
      type.Identification.toString().includes(this.filterText)
    );
    this.totalTypes = this.filteredTypes.length;
    this.totalPages = Math.ceil(this.totalTypes / this.pageSize); // Recalcular el total de páginas
    this.currentPage = 1;  // Reinicia a la primera página del filtro
  }

  // Obtener los tipos para la página actual
  getTypesForCurrentPage(): BusinessType[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredTypes.slice(startIndex, endIndex);
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


  // Crear un nuevo administrador
  createType(): void {
    const dialogRef = this.dialog.open(CreateBusinessTypeComponent, {
      width: '400px',
      data: { types: this.types }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.businessTypeService.create(result).subscribe({
          next: () => {
            //si el tipo se creo correctamente
            console.log('tipo creado: ');
            console.log(result);
            this.loadTypes();
          }
        })
      }

    });
  }

  // Editar un administrador existente
  editType(businessType: BusinessType): void {
    const dialogRef = this.dialog.open(EditBusinessTypeComponent, {
      width: '400px',
      data: { type: businessType, types: this.types}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.businessTypeService.update(businessType.Identification, result).subscribe({
          next: () => {
            //si el edito correctamente se creo correctamente
            console.log('tipo editado: ');
            console.log(result);
            this.loadTypes();
          }
        })
      }
    })
  }

  // Eliminar un administrador
  deleteType(type: BusinessType): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar este tipo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.hasAssociatedBusiness(type.Identification)) {
          this.showErrorDialog("Este tipo tiene un negocio asociado, favor cambie el tipo del negocio o elimine dicho comercio.")
        } else {
          // El usuario confirmó la eliminación
          this.businessTypeService.delete(type.Identification).subscribe({
            next: () => {
              // Elimina el tipo de la lista y actualiza los datos
              this.types = this.types.filter(type => type.Identification !== type.Identification);
              this.filteredTypes = this.filteredTypes.filter(type => type.Identification !== type.Identification);
              this.totalTypes = this.filteredTypes.length;
              this.totalPages = Math.ceil(this.totalTypes / this.pageSize); // Recalcular el total de páginas
              this.loadTypes();
            },
            error: (err) => console.error('Error al eliminar tipo:', err)
          });
        }
      }
    });
  }

  hasAssociatedBusiness(type: number): boolean {
    // Verificar si algún negocio tiene el correo del administrador asociado
    return this.businessAssociates.some(
      (associate) => associate.BusinessType_Identification === type
    );
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }

}
