import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../../../Services/Client/client.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogAdminComponent } from '../delete-dialog-admin/delete-dialog-admin.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-clients-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './clients-management.component.html',
  styleUrl: './clients-management.component.css'
})
export class ClientsManagementComponent {
  clients: Client[] = [];             
  filteredClients: Client[] = [];      
  totalClients: number = 0;           
  pageSize: number = 6;              
  currentPage: number = 1;          
  totalPages: number = 0;           
  filterText: string = ''; 

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // Carga inicial de clientes
  private loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.filteredClients = data;
        this.totalClients = data.length;
        this.totalPages = Math.ceil(this.totalClients / this.pageSize); // Calcular el total de páginas
      },
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

   // Filtrado de clientes
   onFilter(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = input;
    this.filteredClients = this.clients.filter(client => 
      client.FullName.toLowerCase().includes(this.filterText) ||
      client.Id.toString().includes(this.filterText)
    );
    this.totalClients = this.filteredClients.length;
    this.totalPages = Math.ceil(this.totalClients / this.pageSize); // Recalcular el total de páginas
    this.currentPage = 1;  // Reinicia a la primera página del filtro
  }

  // Obtener los administradores para la página actual
  getClientsForCurrentPage(): Client[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredClients.slice(startIndex, endIndex);
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
    const dialogRef = this.dialog.open( CreateClientComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '620px',
      data: {clients: this.clients}
    });
  
    dialogRef.afterClosed().subscribe( result => {
      if (result){
        this.loadClients();
      }
    })
  }

  // Editar un administrador existente
  editClient(previusClient: Client): void {
    const dialogRef = this.dialog.open( EditClientComponent, {
      width: '80vw',
      height: '35vw',
      minWidth: '750px',
      minHeight: '620px',
      data: { client: previusClient, clients: this.clients }
    });
  
    dialogRef.afterClosed().subscribe( result => {
      if (result){
        this.loadClients();
      }
    })
  }

  // Eliminar un administrador
  deleteClient(clientToDelete: Client): void {
    const dialogRef = this.dialog.open(DeleteDialogAdminComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar este administrador?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la eliminación
        this.clientService.delete(clientToDelete.Id).subscribe({
          next: () => {
            // Elimina al administrador de la lista y actualiza los datos
            this.clients = this.clients.filter(client => client.Id !== clientToDelete.Id);
            this.filteredClients = this.filteredClients.filter(client => client.Id !== clientToDelete.Id);
            this.totalClients = this.filteredClients.length;
            this.totalPages = Math.ceil(this.totalClients / this.pageSize); // Recalcular el total de páginas
          },
          error: (err) => console.error('Error al eliminar administrador:', err)
        });
      }
    });
  }
}
