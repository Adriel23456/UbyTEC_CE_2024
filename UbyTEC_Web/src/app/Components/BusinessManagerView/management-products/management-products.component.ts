import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product, ProductService } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { ExtrasService } from '../../../Services/Extras/extras.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DialogConfirmComponent } from '../../ClientView/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-management-products',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './management-products.component.html',
  styleUrl: './management-products.component.css'
})
export class ManagementProductsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Category', 'Price', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<Product>();
  filterControl = new FormControl('');
  businessId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private extrasService: ExtrasService,
    private businessAssociateService: BusinessAssociateService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const currentBusiness = this.businessAssociateService.currentBusinessAssociateValue;
    if (!currentBusiness) {
      this.openDialog('Error', 'No hay negocio autenticado')
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }
    this.businessId = currentBusiness.Legal_Id;
    this.loadProducts();
    // Configurar el filtrado con optimización
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(filterValue => {
        const trimmedFilter = filterValue?.trim() || '';
        if (trimmedFilter === '') {
          // Si el filtro está vacío, usar la lógica original
          this.loadProducts();
        } else {
          // Si hay un filtro, usar la función optimizada
          this.extrasService.getProductsByNameAndBusiness(this.businessId, trimmedFilter)
            .subscribe({
              next: (products) => {
                this.dataSource.data = products;
              },
              error: (error) => {
                console.error('Error al filtrar productos:', error);
                this.openDialog('Error', 'Error al filtrar los productos');
              }
            });
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.dataSource.data = products.filter(
          product => product.BusinessAssociate_Legal_Id === this.businessId
        );
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.openDialog('Error', 'Error al cargar los productos');
      }
    });
  }

  createProduct(): void {
    this.router.navigate(['/sidenavBusiness/createProduct']);
  }

  editProduct(product: Product): void {
    if (!product.Code) {
      this.openDialog('Error', 'Código de producto no válido');
      return;
    }
    this.router.navigate(['/sidenavBusiness/editProduct', product.Code]);
  }

  deleteProduct(product: Product): void {
    if (!product.Code) {
      this.openDialog('Error', 'Código de producto no válido');
      return;
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar el producto "${product.Name}"?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(product.Code!).subscribe({
          next: () => {
            this.openDialog('Éxito', 'Producto eliminado exitosamente')
              .afterClosed()
              .subscribe(() => {
                this.loadProducts(); // Recargar los productos
              });
          },
          error: (error) => {
            console.error('Error al eliminar producto:', error);
            this.openDialog('Error', 'Error al eliminar el producto');
          }
        });
      }
    });
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }
}