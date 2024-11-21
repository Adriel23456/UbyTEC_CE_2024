import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {ProductService,Product} from '../../../Services/Product/product.service';
import { ComunicationService } from '../../../Services/Comunication/comunication.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-management-products',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './management-products.component.html',
  styleUrl: './management-products.component.css'
})
export class ManagementProductsComponent {
}
