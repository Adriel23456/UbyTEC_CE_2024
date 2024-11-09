import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-sidenav-negocio',
  standalone: true,
  imports: [MatCardModule, 
    MatFormField,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterOutlet],
  templateUrl: './sidenav-negocio.component.html',
  styleUrl: './sidenav-negocio.component.css'
})

export class SidenavNegocioComponent {
  constructor(
  ){}

  router = inject(Router);

  onAfiliacionClick(){
    this.router.navigate(['/sidenavNegocio/afiliacion']);
  }

  OnAdminClick(){
    this.router.navigate(['/sidenavNegocio/administrador']);
  }

  onPedidosClick(){
    this.router.navigate(['/sidenavNegocio/pedidos']);
  }

  onProductosClick(){
    this.router.navigate(['/sidenavNegocio/productos']);
  }

  onLogOutClick(){
    this.router.navigate(['/login'])
  };
  
}
