import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
