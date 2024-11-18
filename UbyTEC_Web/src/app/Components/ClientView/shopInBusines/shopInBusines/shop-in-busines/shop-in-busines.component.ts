import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../Services/Product/product.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessAssociateService } from '../../../../../Services/BusinessAssociate/business-associate.service';
import { Product } from '../../../../../Services/Product/product.service';
import { CartService } from '../../../../../Services/Cart/cart.service';
import { ClientService } from '../../../../../Services/Client/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-in-busines',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatCardModule, NgxPaginationModule ],
  templateUrl: './shop-in-busines.component.html',
  styleUrl: './shop-in-busines.component.css'
})
export class ShopInBusinesComponent {
  businessAssociateId: number = 0 ;
  businessAssociateName: string = '';
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  pageSize = 6;
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  cart: any[] = [];
  currentClientId: number=0;
  productPhotos: { [key: number]: string } = {};
  currentImage: { [key: number]: string } = {};
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private cartService: CartService,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.businessAssociateId = parseInt(id, 10);
        if (!isNaN(this.businessAssociateId)) {
          this.businessAssociateService.getByLegalId(this.businessAssociateId).subscribe(
            (businessAssociate) => {
              this.businessAssociateName = businessAssociate.BusinessName; // Asignamos el nombre de negocio
            },
            (error) => {
              console.error('Error al obtener el asociado de negocio', error);
            }
          );
          
          // Obtener todos los productos y filtrarlos por el BusinessAssociate_Legal_Id
          this.productService.getAll().subscribe(products => {
            this.products = products.filter(product => product.BusinessAssociate_Legal_Id === this.businessAssociateId);
            this.totalPages = Math.ceil(this.products.length / this.pageSize);
            this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
            this.updatePageData();
            
            // Obtener las fotos de los productos
            this.loadProductPhotos();
          }, error => {
            console.error('Error al obtener los productos', error);
          });
        }
      }
    });
  }

  loadProductPhotos() {
    this.products.forEach(product => {
      if (product.Code !== undefined) { 
        this.productService.getPhotosByCode(product.Code).subscribe(photos => {
          if (photos.length > 0) {
            this.productPhotos[product.Code as number] = photos[0].PhotoURL;
          }
        }, error => {
          console.error(`Error al obtener foto para el producto ${product.Code}`, error);
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


  addToCart(pCode: number | undefined) {
    if (pCode === undefined) {
      console.error('Error: Código del producto no válido');
      return;
    }
  
    // Obtener el Client_Id desde el servicio de autenticación
    this.clientService.getAll().subscribe((clients) => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        this.currentClientId = currentClient.Id;
  
        // Obtener todos los carritos
        this.cartService.getAll().subscribe((carts) => {
          if (carts && carts.length > 0) {
            // Encontrar el carrito con el mayor 'Code'
            const lastCart = carts.reduce((prev, current) =>
              current.Code > prev.Code ? current : prev
            );
  
            const newCartProduct = {
              Cart_Code: lastCart.Code, // Usamos el código del último carrito
              Product_Code: pCode as number, 
            };
  
            // Llamar al servicio CartService para crear el nuevo item en el carrito
            this.cartService.addProduct(newCartProduct).subscribe(
              (response) => {
                this.snackBar.open('Se añadió al carrito', 'Cerrar', {
                  duration: 3000, // Duración del mensaje en milisegundos
                  horizontalPosition: 'right', // Posición horizontal
                  verticalPosition: 'bottom', // Posición vertical
                });
              },
              (error) => {
                console.error('Error al añadir producto al carrito', error);
              }
            );
          } else {
            console.error('No se encontraron carritos para el cliente actual.');
          }
        });
      }
    });
  }  

  
}