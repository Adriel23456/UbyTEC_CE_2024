import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from '../../../Services/Authentication/Authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


@Component({
  selector: 'app-sidenav-admin',
  standalone: true,
  imports: [
    MatCardModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterOutlet
  ],
  templateUrl: './sidenav-admin.component.html',
  styleUrl: './sidenav-admin.component.css'
})
export class SidenavAdminComponent {
  constructor(
    private authenticationService: AuthenticationService,
  ){}
  router = inject(Router);

  onDashboardClick(){
    this.router.navigate(['/sidenavAdmin/dashboard']);
  }

  onLogOutClick(){
    this.router.navigate(['/login'])
    this.authenticationService.logout();
  };

}
