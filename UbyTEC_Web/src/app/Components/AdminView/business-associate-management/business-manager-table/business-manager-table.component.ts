import { Component, OnInit } from '@angular/core';
import { BusinessManager, BusinessManagerService } from '../../../../Services/BusinessManager/business-manager.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BusinessAssociate, BusinessAssociateService } from '../../../../Services/BusinessAssociate/business-associate.service';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { EditBusinessManagerComponent } from './edit-business-manager/edit-business-manager.component'
import { CreateBusinessManagerComponent } from './create-business-manager/create-business-manager.component';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';


@Component({
  selector: 'app-business-manager-table',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './business-manager-table.component.html',
  styleUrl: './business-manager-table.component.css'
})
export class BusinessManagerTableComponent implements OnInit {
  businessManagers: BusinessManager[] = [];
  filteredBusinessManagers: BusinessManager[] = [];
  totalBusinessManagers: number = 0;
  businessAssociates: BusinessAssociate[] = [];

  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  filterText: string = '';

  constructor(
    private businessManagerService: BusinessManagerService,
    private businessAssociateService: BusinessAssociateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBusinessManagers();
    this.loadBusinessAssociates();
  }

  loadBusinessAssociates(): void {
    this.businessAssociateService.getAll().subscribe({
      next: (data: BusinessAssociate[]) => {
        const businessAssociates = data;
        this.businessAssociates = businessAssociates;
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
    });
  }

  loadBusinessManagers(): void {
    this.businessManagerService.getAll().subscribe({
      next: (data: BusinessManager[]) => {
        this.businessManagers = data;
        this.filteredBusinessManagers = data;
        this.totalBusinessManagers = data.length;
        this.totalPages = Math.ceil(this.totalBusinessManagers / this.pageSize);
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
    });
  }

  onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredBusinessManagers = this.businessManagers.filter(businessManager =>
      businessManager.FullName.toLowerCase().includes(this.filterText) ||
      businessManager.Email.toString().includes(this.filterText)
    );
    this.totalBusinessManagers = this.filteredBusinessManagers.length;
    this.totalPages = Math.ceil(this.totalBusinessManagers / this.pageSize); // Recalcular el total de páginas
    this.currentPage = 1;  // Reinicia a la primera página del filtro
  }

  // Obtener los administradores de negocios para la página actual
  getBusinessManagersForCurrentPage(): BusinessManager[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredBusinessManagers.slice(startIndex, endIndex);
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

  createBusinessManager(): void {
    const dialogRef = this.dialog.open(CreateBusinessManagerComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBusinessManagers();
      }
    })
  }

  editBusinessManager(businessManager: BusinessManager): void {
    const dialogRef = this.dialog.open(EditBusinessManagerComponent, {
      width: '80vw',
      height: '33vw',
      minWidth: '750px',
      minHeight: '620px',
      data: { businessManager: businessManager }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBusinessManagers();
      }
    })
  }

  deleteBusinessManager(businessManagerToDelete: BusinessManager): void {
    this.loadBusinessAssociates();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar este administrador de negocio?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la eliminación
        // Verificar si tiene un negocio afiliado
        if (this.hasAssociatedBusiness(businessManagerToDelete)) {
          this.showErrorDialog("Este gerente tiene un negocio afiliado, favor cambie el gerente del negocio o elimine dicho comercio.")
        } else {
          this.businessManagerService.delete(businessManagerToDelete.Email).subscribe({
            next: () => {
              // Elimina al administrador de la lista y actualiza los datos
              this.businessManagers = this.businessManagers.filter(businessManager => businessManager.Email !== businessManagerToDelete.Email);
              this.filteredBusinessManagers = this.filteredBusinessManagers.filter(businessManager => businessManager.Email !== businessManagerToDelete.Email);
              this.totalBusinessManagers = this.filteredBusinessManagers.length;
              this.totalPages = Math.ceil(this.totalBusinessManagers / this.pageSize); // Recalcular el total de páginas
            },
            error: (err) => console.error('Error al eliminar administrador:', err)
          });
        }

      }
    });
  }

  hasAssociatedBusiness(manager: BusinessManager): boolean {
    // Verificar si algún negocio tiene el correo del administrador asociado
    return this.businessAssociates.some(
      (associate) => associate.BusinessManager_Email === manager.Email
    );
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
