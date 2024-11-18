import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BusinessAssociate, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ClientService } from '../../../Services/Client/client.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { CartService } from '../../../Services/Cart/cart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenerateOrderComponent } from '../GenerateOrder/GenerateOrder/generate-order/generate-order.component';
import { EditCartComponent } from '../EditCart/EditCart/edit-cart/edit-cart.component';


@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatTableModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDialogModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
  displayedColumns: string[] = ['position', 'BusinessName', 'QuantityProducts', 'Amount', 'Edit', 'Delete', 'FinalizeOrder'];
  dataSource = new MatTableDataSource<any>([]);
  currentClientId: number=0;
  carts: any[] = [];
  businessAssociates: BusinessAssociate[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private businessAService: BusinessAssociateService,
    private clientService: ClientService,
    private cartService: CartService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Obtener el cliente actual
    this.clientService.getAll().subscribe(clients => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        this.currentClientId = currentClient.Id;

        // Obtener todos los carritos y filtrar por el cliente actual
        this.cartService.getAll().subscribe(carts => {
          this.carts = carts.filter(cart => cart.Client_Id === this.currentClientId);

          // Obtener todos los BusinessAssociates antes de continuar
          this.businessAService.getAll().subscribe(businessAssociates => {
            this.businessAssociates = businessAssociates;

            // Para cada carrito, obtener sus productos 
            const cartProductObservables = this.carts.map(cart =>
              this.cartService.getProductsByCode(cart.Code).pipe(map(products => ({ ...cart, products })))
            );

            forkJoin(cartProductObservables).subscribe(updatedCarts => {
              this.dataSource.data = updatedCarts.map(cart => {
                // Buscar el BusinessAssociate correspondiente al carrito
                const businessAssociate = this.businessAssociates.find(ba => ba.Legal_Id === cart.BusinessAssociate_Legal_Id);
                const quantityProducts = cart.products ? cart.products.reduce((total: number, currentProduct: { Amount?: number }) => total + (currentProduct.Amount || 0), 0) : 0;
                const pCode = cart.products && cart.products[0] ? cart.products[0].Product_Code : 0; 
                if( quantityProducts === 0){
                  this.deleteCar(cart.Code, pCode, "Carritos actualizados")
                }
                return {
                  BusinessName: businessAssociate ? businessAssociate.BusinessName : 'No disponible',
                  QuantityProducts: quantityProducts, 
                  Amount: cart.TotalProductsPrice, 
                  Code: cart.Code,
                  products: cart.products || [],
                  PCode: pCode ,
                  BALID: cart.BusinessAssociate_Legal_Id,
                  ...cart
                };
              });

              this.dataSource.paginator = this.paginator;
            });
          });
        });
      }
    });
  }

  // Filtro para la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
//------------------------------------------------------------editar---------------------------------------------------------
  editCart(cartCode: number): void {
    
    const dialogRef = this.dialog.open(EditCartComponent, {
      width: '90%',
      data: {Carrito: cartCode
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
        this.snackBar.open('Carrito Actualizado', 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
          horizontalPosition: 'right', // Posición horizontal
          verticalPosition: 'bottom', // Posición vertical
        });
      }
    });
  }


//-------------------------------------------------------------confirmar delete--------------------------------------------------------
  confirmDelete(cartCode: number, productCode: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este carrito?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(cartCode, productCode, "Se eliminó el carrito");
      }
    });
  }
//----------------------------------------------------------------delete----------------------------------------------
  deleteCar(cartCode: number, productCode: number, msg: string): void {
    console.log('Eliminar carrito:', cartCode, 'Producto:', productCode); 

    this.cartService.deleteProduct(cartCode, productCode).subscribe({
      next: () => {
        console.log('Producto eliminado con éxito');
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });

    this.cartService.delete(cartCode).subscribe({
      next: () => {
        console.log('Carrito eliminado con éxito');

        // Mostrar el mensaje de éxito
        this.snackBar.open(msg, 'Cerrar', {
          duration: 3000, // Duración del mensaje en milisegundos
          horizontalPosition: 'right', // Posición horizontal
          verticalPosition: 'bottom', // Posición vertical
        });
  
        this.dataSource.data = this.dataSource.data.filter(cart => cart.Code !== cartCode);
      
      },
      error: (err) => {
        console.error('Error al eliminar el carrito:', err);
      }
    });
  }
//--------------------------------------------------------------------finalizar-----------------------------------------------
finalizeCart(products: { Product_Code: number }[], cartCode: number): void {
    const dialogRef = this.dialog.open(GenerateOrderComponent, {
      data: {
        Products: products.map(product => product.Product_Code)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(cartCode, 0, "¡Espera al repartidor!");
      }
    });
}

  
}