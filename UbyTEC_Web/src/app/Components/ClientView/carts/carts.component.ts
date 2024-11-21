import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ClientService } from '../../../Services/Client/client.service';
import { forkJoin } from 'rxjs';
import { CartProduct, CartService } from '../../../Services/Cart/cart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../ClientView/dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditCartComponent } from '../edit-cart/edit-cart.component';
import { GenerateOrderComponent } from '../generate-order/generate-order.component';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
  displayedColumns: string[] = ['position', 'BusinessName', 'QuantityProducts', 'Amount', 'Edit', 'Delete', 'FinalizeOrder'];
  dataSource = new MatTableDataSource<any>([]);
  currentClientId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private businessAService: BusinessAssociateService,
    private clientService: ClientService,
    private cartService: CartService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentClientId = currentClient.Id;
    this.loadCartsData();
  }

  private loadCartsData(): void {
    forkJoin({
      carts: this.cartService.getAll(),
      products: this.cartService.getAllProducts(),
      businesses: this.businessAService.getAll()
    }).subscribe({
      next: ({ carts, products, businesses }) => {
        // Filtrar carritos del cliente actual
        const clientCarts = carts.filter(cart => cart.Client_Id === this.currentClientId);

        // Agrupar productos por carrito y calcular cantidades
        const cartProducts = new Map<number, CartProduct[]>();
        products.forEach(product => {
          if (!cartProducts.has(product.Cart_Code)) {
            cartProducts.set(product.Cart_Code, []);
          }
          cartProducts.get(product.Cart_Code)?.push(product);
        });

        // Preparar datos para la tabla
        const tableData = clientCarts
          .filter(cart => {
            const cartProductList = cartProducts.get(cart.Code) || [];
            return cartProductList.length > 0;
          })
          .map(cart => {
            const cartProductList = cartProducts.get(cart.Code) || [];
            const quantityProducts = cartProductList.reduce((total, product) => total + (product.Amount || 0), 0);
            const businessAssociate = businesses.find(ba => ba.Legal_Id === cart.BusinessAssociate_Legal_Id);
          
            return {
              BusinessName: businessAssociate?.BusinessName || 'No disponible',
              QuantityProducts: quantityProducts,
              Amount: cart.TotalProductsPrice,
              products: cartProductList,
              PCode: cartProductList[0]?.Product_Code,
              BALID: cart.BusinessAssociate_Legal_Id,
              Client_Id: cart.Client_Id,
              BusinessAssociate_Legal_Id: cart.BusinessAssociate_Legal_Id,
              TotalProductsPrice: cart.TotalProductsPrice,
              Code: cart.Code
            };
          });
        this.dataSource.data = tableData;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.error('Error loading carts data:', error)
    });
  }

  // Filtro para la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  //Edición del carrito
  editCart(cartCode: number): void {
    const dialogRef = this.dialog.open(EditCartComponent, {
      width: '99%',
      data: { Carrito: cartCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
        this.snackBar.open('Carrito Actualizado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  //Confirmar la eliminación
  confirmDelete(cartCode: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este carrito?'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(cartCode);
      }
    });
  }

  //Eliminacion del carrito
  deleteCar(cartCode: number): void {
    this.cartService.delete(cartCode).subscribe({
      next: () => {
        this.snackBar.open("Se elimino el carrito con exito", 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        location.reload();
      },
      error: (err) => console.error('Error al eliminar el carrito:', err)
    });
  }

  //Finalizar el carrito, generando una orden en base a este
  finalizeCart(products: CartProduct[], cartCode: number): void {
    const dialogRef = this.dialog.open(GenerateOrderComponent, {
      data: {
        products
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(cartCode);
      }
    });
  }
}
