import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { ProductService, Product } from '../../../Services/Product/product.service';

@Component({
  selector: 'app-management-products',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './management-products.component.html',
  styleUrl: './management-products.component.css'
})
export class ManagementProductsComponent {
  constructor(
    private dialog: MatDialog,
    public service: ProductService,
  ) {}

  listData = new MatTableDataSource<any>
  products: Product[] = [];
  searchKey = '';
  displayedColumns: string[] = ['nombre', 'categoria', 'fotos', 'precio','actions'];

  ngOnInit() {
    this.service.getAll().subscribe({
      next: (data: Product[]) =>
      {
        this.products = data;
      },
    })
  }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateDialogComponent, dialogConfig).afterClosed().subscribe(() => {this.ngOnInit()}); // Actualiza lista luego de cerrar
  }

  updateDialog(): void {
  }

  deleteProducto(row : any): void {
    this.service.delete(row).subscribe((row)=>{
      this.ngOnInit();
    })
    
  }
}
