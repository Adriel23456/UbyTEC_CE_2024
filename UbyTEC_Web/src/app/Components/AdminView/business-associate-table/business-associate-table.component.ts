import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BusinessAssociate, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { DeleteDialogAdminComponent } from '../delete-dialog-admin/delete-dialog-admin.component';
import { CreateAssociateComponent } from '../create-associate/create-associate.component';
import { EditAssociateComponent } from '../edit-associate/edit-associate.component';

@Component({
  selector: 'app-business-associate-table',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './business-associate-table.component.html',
  styleUrl: './business-associate-table.component.css'
})
export class BusinessAssociateTableComponent implements OnInit {
  businessAssociates: BusinessAssociate[] = [];
  filteredBusinessAssociates: BusinessAssociate[] = [];
  totalBusinessAssociates: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  filterText: string = '';

  constructor(
    private businessAssociateService: BusinessAssociateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBusinessAssociates();
  }

  loadBusinessAssociates(): void {
    this.businessAssociateService.getAll().subscribe({
      next: (data: BusinessAssociate[]) => {

        // Filtrar solo los negocios con estado "Aceptado"
        const acceptedBusinessAssociates = data.filter(businessAssociate => businessAssociate.State === 'Aceptado');

        this.businessAssociates = acceptedBusinessAssociates;
        this.filteredBusinessAssociates = acceptedBusinessAssociates;
        this.totalBusinessAssociates = acceptedBusinessAssociates.length;
        this.totalPages = Math.ceil(this.totalBusinessAssociates / this.pageSize);
      },
      error: (err) => console.error('Error al cargar administradores de negocios: ', err)
    });
  }

  onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredBusinessAssociates = this.businessAssociates.filter(businessAssociate =>
      businessAssociate.BusinessName.toLowerCase().includes(this.filterText) ||
      businessAssociate.Email.toString().includes(this.filterText)
    );
    this.totalBusinessAssociates = this.filteredBusinessAssociates.length;
    this.totalPages = Math.ceil(this.totalBusinessAssociates / this.pageSize); // Recalcular el total de páginas
    this.currentPage = 1;  // Reinicia a la primera página del filtro
  }

  // Obtener los administradores de negocios para la página actual
  getBusinessAssociatesForCurrentPage(): BusinessAssociate[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredBusinessAssociates.slice(startIndex, endIndex);
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

  createBusinessAssociate(): void {
    const dialogRef = this.dialog.open(CreateAssociateComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBusinessAssociates();
      }
    })
  }

  editBusinessAssociate(businessAssociate: BusinessAssociate): void {
    const dialogRef = this.dialog.open(EditAssociateComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '720px',
      data: { businessAssociate: businessAssociate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBusinessAssociates();
      }
    })
  }

  deleteBusinessAssociate(legalNum: number): void {
    const dialogRef = this.dialog.open(DeleteDialogAdminComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar este negocio asociado?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la eliminación
        this.businessAssociateService.delete(legalNum).subscribe({
          next: () => {
            // Elimina al administrador de la lista y actualiza los datos
            this.businessAssociates = this.businessAssociates.filter(businessAssociate => businessAssociate.Legal_Id !== legalNum);
            this.filteredBusinessAssociates = this.filteredBusinessAssociates.filter(businessAssociate => businessAssociate.Legal_Id !== legalNum);
            this.totalBusinessAssociates = this.filteredBusinessAssociates.length;
            this.totalPages = Math.ceil(this.totalBusinessAssociates / this.pageSize); // Recalcular el total de páginas
          },
          error: (err) => console.error('Error al eliminar negocio asociado:', err)
        });
      }
    });
  }
}
