import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SidenavAdminComponent } from '../sidenav-admin/sidenav-admin.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    DashboardComponent,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    SidenavAdminComponent, 
    RouterOutlet
  ],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']  // Asegúrate de que sea styleUrls, no styleUrl
})
export class AdminViewComponent {}

