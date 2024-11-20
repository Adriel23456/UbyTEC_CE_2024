import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductService } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { CartCreate, CartProductCreate, CartService } from '../../../Services/Cart/cart.service';
import { ClientService } from '../../../Services/Client/client.service';

@Component({
  selector: 'app-shop-in-business',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './shop-in-business.component.html',
  styleUrl: './shop-in-business.component.css'
})
export class ShopInBusinessComponent {
  businessAssociateId: number = 0;
  businessAssociateName: string = '';
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  pageSize = 6;
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  currentCartCode: number | null = null;
  productPhotos: { [key: number]: string } = {};
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private cartService: CartService,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.businessAssociateId = parseInt(id, 10);
        if (!isNaN(this.businessAssociateId)) {
          this.initializeBusinessData();
          this.findOrCreateCart(currentClient.Id);
        }
      }
    });
  }

  private initializeBusinessData() {
    this.businessAssociateService.getByLegalId(this.businessAssociateId).subscribe(
      (businessAssociate) => {
        this.businessAssociateName = businessAssociate.BusinessName;
      },
      (error) => {
        console.error('Error al obtener el asociado de negocio', error);
      }
    );
    this.productService.getAll().subscribe(products => {
      this.products = products.filter(product => 
        product.BusinessAssociate_Legal_Id === this.businessAssociateId
      );
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      this.totalPagesArray = Array.from(
        { length: this.totalPages }, 
        (_, i) => i + 1
      );
      this.updatePageData();
      this.loadProductPhotos();
    });
  }

  private findOrCreateCart(clientId: number) {
    this.cartService.getAll().subscribe(carts => {
      const existingCart = carts.find(cart => 
        cart.BusinessAssociate_Legal_Id === this.businessAssociateId && 
        cart.Client_Id === clientId
      );
      if (existingCart) {
        this.currentCartCode = existingCart.Code;
      } else {
        const cartCreate: CartCreate = { Client_Id: clientId };
        this.cartService.create(cartCreate).subscribe(
          newCart => this.currentCartCode = newCart.Code
        );
      }
    });
  }

  loadProductPhotos() {
    this.products.forEach(product => {
      const code = product.Code; // Guardamos en una variable local para simplificar
      if (code !== undefined && code !== null) { 
        this.productService.getPhotosByCode(code).subscribe(photos => {
          if (photos.length > 0) {
            this.productPhotos[code] = photos[0].PhotoURL; // 'code' ya está validado como número
          }
        }, error => {
          console.error(`Error al obtener foto para el producto ${code}`, error);
        });
      }
    });
  } 
  
  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }

  addToCart(pCode: number | null | undefined) {
    if (!pCode || !this.currentCartCode) {
      console.error('Error: Código del producto o carrito no válido');
      return;
    }
    const cartProduct: CartProductCreate = {
      Cart_Code: this.currentCartCode,
      Product_Code: pCode
    };
    this.cartService.addProduct(cartProduct).subscribe(
      () => {
        this.snackBar.open('Se añadió al carrito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => console.error('Error al añadir producto al carrito', error)
    );
  }
}