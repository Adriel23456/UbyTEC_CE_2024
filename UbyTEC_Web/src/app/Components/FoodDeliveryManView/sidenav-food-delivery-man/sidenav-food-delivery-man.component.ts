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
import { FoodDeliveryManService } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';

@Component({
  selector: 'app-sidenav-food-delivery-man',
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
  templateUrl: './sidenav-food-delivery-man.component.html',
  styleUrl: './sidenav-food-delivery-man.component.css'
})
export class SidenavFoodDeliveryManComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  // Inicialización sin usar el servicio directamente
  currentSessionName: string = 'Repartidor';

  constructor(
    private router: Router,
    private foodDeliveryManService: FoodDeliveryManService,
    private cdr: ChangeDetectorRef
  ) {
    // Asignar el nombre completo del administrador dentro del constructor
    const foodDeliveryMan = this.foodDeliveryManService.currentDeliveryManValue;
    this.currentSessionName = foodDeliveryMan?.FullName || 'Repartidor';
  }

  ngAfterViewInit() {
    // Forzar una actualización de la vista
    this.cdr.detectChanges();
  }
  // Función para manejar el cierre de sesión
  logout() {
    this.foodDeliveryManService.logout();
  }
}