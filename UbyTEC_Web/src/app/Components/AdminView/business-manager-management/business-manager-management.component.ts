import { Component, OnInit } from '@angular/core';
import { BusinessAssociateService, BusinessAssociate } from '../../../Services/BusinessAssociate/business-associate.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RejectAssociateComponent } from '../reject-associate/reject-associate.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-business-manager-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './business-manager-management.component.html',
  styleUrl: './business-manager-management.component.css'
})
export class BusinessManagerManagementComponent {
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
        const notAcceptedBusinessAssociates = data.filter(businessAssociate => businessAssociate.State === 'En espera' || businessAssociate.State === 'Rechazado');

        this.businessAssociates = notAcceptedBusinessAssociates;
        this.filteredBusinessAssociates = notAcceptedBusinessAssociates;
        this.totalBusinessAssociates = notAcceptedBusinessAssociates.length;
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

  acceptAssociate(businessAssociate: BusinessAssociate): void {
    const updatedAssociate = { ...businessAssociate };
    // Cambiar el estado a 'Aceptado'
    updatedAssociate.State = 'Aceptado';

    // Llamar al servicio de actualización
    this.businessAssociateService.update(updatedAssociate.Legal_Id, updatedAssociate).subscribe({
      next: (response) => {
        // Actualizacion exitosa
        this.showSuccessDialog('Negocio aceptado con éxito.')
        this.loadBusinessAssociates();  // Recargar los datos de la lista
      },
      error: (err) => {
        // Fallo al actualizar
        console.error('Error al aceptar el negocio:', err);
      }
    });
  }

  rejectAssociate(businessAssociate: BusinessAssociate): void {
    if (businessAssociate.RejectReason) {
      const dialogRef = this.dialog.open(RejectAssociateComponent, {
        width: '400px',
        data: { rejectReason: businessAssociate.RejectReason }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedAssociate = { ...businessAssociate };
          updatedAssociate.RejectReason = result;
          updatedAssociate.State = "Rechazado";

          // Llamar al servicio de actualización
          this.businessAssociateService.update(updatedAssociate.Legal_Id, updatedAssociate).subscribe({
            next: (response) => {
              // Actualizacion exitosa
              this.showSuccessDialog('Negocio rechazado con éxito.')
              this.loadBusinessAssociates();  // Recargar los datos de la lista
            },
            error: (err) => {
              // Fallo al actualizar
              console.error('Error al aceptar el negocio:', err);
            }
          });
        }
      });
    }else{
      const dialogRef = this.dialog.open(RejectAssociateComponent, {
        width: '400px',
        data: { rejectReason: ''}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedAssociate = { ...businessAssociate };
          updatedAssociate.RejectReason = result;
          updatedAssociate.State = "Rechazado";

          // Llamar al servicio de actualización
          this.businessAssociateService.update(updatedAssociate.Legal_Id, updatedAssociate).subscribe({
            next: (response) => {
              // Actualizacion exitosa
              this.showSuccessDialog('Negocio rechazado con éxito.')
              this.loadBusinessAssociates();  // Recargar los datos de la lista
            },
            error: (err) => {
              // Fallo al actualizar
              console.error('Error al aceptar el negocio:', err);
            }
          });
        }
      });
    }
  }

  showSuccessDialog(errorMessage: string): void {
    this.dialog.open(SuccessMessageComponent, {
      width: '400px',
      data: { message: errorMessage }
    });
  }
}
