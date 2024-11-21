import { Component, OnInit } from '@angular/core';
import { AdminService, Admin } from '../../../Services/Admin/admin.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogAdminComponent } from '../delete-dialog-admin/delete-dialog-admin.component';
import { EditAdminComponent } from '../edit-admin/edit-admin.component';
import { CreateAdminComponent } from '../create-admin/create-admin.component';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css'
})
export class AdminManagementComponent implements OnInit {
  admins: Admin[] = [];              // Lista completa de administradores
  filteredAdmins: Admin[] = [];       // Lista filtrada de administradores
  totalAdmins: number = 0;            // Número total de administradores
  pageSize: number = 6;               // Número de administradores por página
  currentPage: number = 1;            // Página actual
  totalPages: number = 0;             // Total de páginas
  filterText: string = '';            // Texto del filtro

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  // Carga inicial de administradores
  private loadAdmins(): void {
    this.adminService.getAll().subscribe({
      next: (data: Admin[]) => {
        this.admins = data;
        this.filteredAdmins = data;
        this.totalAdmins = data.length;
        this.totalPages = Math.ceil(this.totalAdmins / this.pageSize); // Calcular el total de páginas
      },
      error: (err) => console.error('Error al cargar administradores:', err)
    });
  }

  // Filtrado de administradores
  onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredAdmins = this.admins.filter(admin => 
      admin.FullName.toLowerCase().includes(this.filterText) ||
      admin.Id.toString().includes(this.filterText)
    );
    this.totalAdmins = this.filteredAdmins.length;
    this.totalPages = Math.ceil(this.totalAdmins / this.pageSize); // Recalcular el total de páginas
    this.currentPage = 1;  // Reinicia a la primera página del filtro
  }

  // Obtener los administradores para la página actual
  getAdminsForCurrentPage(): Admin[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredAdmins.slice(startIndex, endIndex);
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
  createAdmin(): void {
    const dialogRef = this.dialog.open( CreateAdminComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '700px',
    });
  
    dialogRef.afterClosed().subscribe( result => {
      if (result){
        this.loadAdmins();
      }
    })
  }

  // Editar un administrador existente
  editAdmin(admin: Admin): void {
    const dialogRef = this.dialog.open( EditAdminComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '700px',
      data: { admin: admin }
    });
  
    dialogRef.afterClosed().subscribe( result => {
      if (result){
        this.loadAdmins();
      }
    })
  }

  // Eliminar un administrador
  deleteAdmin(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogAdminComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar este administrador?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la eliminación
        this.adminService.delete(id).subscribe({
          next: () => {
            // Elimina al administrador de la lista y actualiza los datos
            this.admins = this.admins.filter(admin => admin.Id !== id);
            this.filteredAdmins = this.filteredAdmins.filter(admin => admin.Id !== id);
            this.totalAdmins = this.filteredAdmins.length;
            this.totalPages = Math.ceil(this.totalAdmins / this.pageSize); // Recalcular el total de páginas
          },
          error: (err) => console.error('Error al eliminar administrador:', err)
        });
      }
    });
  }
}
