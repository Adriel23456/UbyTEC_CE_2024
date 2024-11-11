import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDrawerContent} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { RouterLink, RouterOutlet} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatToolbar} from "@angular/material/toolbar";
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { AdminService } from '../../../Services/Admin/admin.service';

@Component({
  selector: 'app-sidenav-admin',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatNavList,
    MatListItem,
    MatButton,
    MatDrawerContent,
    MatIcon,
    RouterLink,
    MatToolbar,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './sidenav-admin.component.html',
  styleUrl: './sidenav-admin.component.css'
})
export class SidenavAdminComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  // Inicialización sin usar el servicio directamente
  currentSessionName: string = 'Administrador';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    // Asignar el nombre completo del administrador dentro del constructor
    const admin = this.adminService.currentAdminValue;
    this.currentSessionName = admin?.FullName || 'Administrador';
  }

  ngAfterViewInit() {
    // Forzar una actualización de la vista
    this.cdr.detectChanges();
  }
  // Función para manejar el cierre de sesión
  logout() {
    this.adminService.logout();
  }
}