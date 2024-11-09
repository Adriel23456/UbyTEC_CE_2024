import { Component } from '@angular/core';
import { SidenavNegocioComponent } from '../sidenav-negocio/sidenav-negocio.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-negocio-view',
  standalone: true,
  imports: [SidenavNegocioComponent],
  templateUrl: './negocio-view.component.html',
  styleUrl: './negocio-view.component.css'
})

export class NegocioViewComponent {

}
