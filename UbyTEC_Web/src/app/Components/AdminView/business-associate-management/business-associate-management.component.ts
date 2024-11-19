import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessAssociateTableComponent } from './business-associate-table/business-associate-table.component';
import { BusinessManagerTableComponent } from './business-manager-table/business-manager-table.component';


@Component({
  selector: 'app-business-associate-management',
  standalone: true,
  imports: [
    CommonModule,
    BusinessAssociateTableComponent,
    BusinessManagerTableComponent
  ],
  templateUrl: './business-associate-management.component.html',
  styleUrl: './business-associate-management.component.css'
})
export class BusinessAssociateManagementComponent {
  
}
