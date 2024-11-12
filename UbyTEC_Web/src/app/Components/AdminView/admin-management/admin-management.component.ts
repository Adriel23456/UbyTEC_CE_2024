import { Component, OnInit } from '@angular/core';
import { AdminService, Admin } from '../../../Services/Admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
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
    private adminService: AdminService
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
    console.log("Abrir formulario de creación de administrador");
  }

  // Editar un administrador existente
  editAdmin(admin: Admin): void {
    console.log("Editar administrador:", admin);
  }

  // Eliminar un administrador
  deleteAdmin(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este administrador?")) {
      this.adminService.delete(id).subscribe({
        next: () => {
          this.admins = this.admins.filter(admin => admin.Id !== id);
          this.filteredAdmins = this.filteredAdmins.filter(admin => admin.Id !== id);
          this.totalAdmins = this.filteredAdmins.length;
          this.totalPages = Math.ceil(this.totalAdmins / this.pageSize); // Recalcular el total de páginas
          alert('Administrador eliminado correctamente');
        },
        error: (err) => console.error('Error al eliminar administrador:', err)
      });
    }
  }
}
