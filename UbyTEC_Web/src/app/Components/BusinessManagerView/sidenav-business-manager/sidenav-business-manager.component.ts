import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDrawerContent} from "@angular/material/sidenav";
import { RouterLink, RouterOutlet} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';

@Component({
  selector: 'app-sidenav-business-manager',
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
  templateUrl: './sidenav-business-manager.component.html',
  styleUrl: './sidenav-business-manager.component.css'
})
export class SidenavBusinessManagerComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  // Inicialización sin usar el servicio directamente
  currentSessionName: string = 'Administrador';

  constructor(
    private router: Router,
    private businessAssociateService: BusinessAssociateService,
    private businessManagerService: BusinessManagerService,
    private cdr: ChangeDetectorRef
  ) {
    // Asignar el nombre completo del administrador dentro del constructor
    const businessAssociate = this.businessAssociateService.currentBusinessAssociateValue;
    this.currentSessionName = businessAssociate?.BusinessName || 'Empresa';
  }

  ngAfterViewInit() {
    // Forzar una actualización de la vista
    this.cdr.detectChanges();
  }
  // Función para manejar el cierre de sesión
  logout() {
    this.businessManagerService.logout();
  }
}
