import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { map, forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../Services/Cart/cart.service';
import { ProductService } from '../../../Services/Product/product.service';

@Component({
  selector: 'app-edit-cart',
  standalone: true,
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './edit-cart.component.html',
  styleUrl: './edit-cart.component.css'
})
export class EditCartComponent {
  displayedColumns: string[] = ['productName', 'price', 'amount', 'delete?'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<EditCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Carrito: number },
    private cartService: CartService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartService.getProductsByCode(this.data.Carrito).subscribe(cartProducts => {
      const productDetails$ = cartProducts.map(cartProduct =>
        this.productService.getByCode(cartProduct.Product_Code).pipe(
          map(product => ({
            productName: product.Name,
            price: product.Price,
            amount: cartProduct.Amount,
            productCode: cartProduct.Product_Code,
          }))
        )
      );
      forkJoin(productDetails$).subscribe(productDetails => {
        this.dataSource.data = productDetails;
        this.dataSource.paginator = this.paginator;
      });
    });
    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteProductCart(productCode: number, productName: string): void {
    this.cartService.deleteProduct(this.data.Carrito, productCode).subscribe({
      next: () => {
        // Volver a obtener los productos del carrito después de eliminar el producto
        this.cartService.getProductsByCode(this.data.Carrito).subscribe(cartProducts => {
          const productDetails$ = cartProducts.map(cartProduct =>
            this.productService.getByCode(cartProduct.Product_Code).pipe(
              map(product => ({
                productName: product.Name,
                price: product.Price,
                amount: cartProduct.Amount,
                productCode: cartProduct.Product_Code,
              }))
            )
          );
          forkJoin(productDetails$).subscribe(productDetails => {
            this.dataSource.data = productDetails;
            this.dataSource.paginator = this.paginator;
          });
          this.snackBar.open(productName + ' eliminado correctamente del carrito ', 'Cerrar', {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'right', // Posición horizontal
            verticalPosition: 'bottom', // Posición vertical
          });
        });
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }
  
  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y devuelve true
  }
}
