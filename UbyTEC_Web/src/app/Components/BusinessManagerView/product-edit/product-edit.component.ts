import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { ProductService, Product, ProductUpdate, ProductPhoto } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { ProductAddPhotoDialogComponent } from '../product-add-photo-dialog/product-add-photo-dialog.component';
import { ProductEditPhotoDialogComponent } from '../product-edit-photo-dialog/product-edit-photo-dialog.component';
import { DialogConfirmComponent } from '../../ClientView/dialog-confirm/dialog-confirm.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  photoDataSource = new MatTableDataSource<ProductPhoto>();
  displayedColumns: string[] = ['url', 'edit', 'delete'];
  productCode: number = 0;
  businessId: number = 0;

  categories = [
    'Entrada',
    'Plato principal',
    'Bebida',
    'Complemento',
    'Postre',
    'Medicamento',
    'Producto general',
    'Extra'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private productService: ProductService,
    private businessAssociateService: BusinessAssociateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      Category: ['', Validators.required],
      BusinessAssociate_Legal_Id: [{ value: '', disabled: true }]
    });
  }

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

    // Obtener el código del producto de la URL
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) {
      this.router.navigate(['/login']);
      return;
    }
    this.productCode = parseInt(code);

    // Cargar los datos del producto y sus fotos
    forkJoin([
      this.productService.getByCode(this.productCode),
      this.productService.getPhotosByCode(this.productCode)
    ]).subscribe({
      next: ([product, photos]) => {
        // Verificar que el producto pertenece al negocio actual
        if (product.BusinessAssociate_Legal_Id !== this.businessId) {
          this.router.navigate(['/login']);
          return;
        }

        // Cargar datos del producto en el formulario
        this.productForm.patchValue({
          Name: product.Name,
          Price: product.Price,
          Category: product.Category,
          BusinessAssociate_Legal_Id: product.BusinessAssociate_Legal_Id
        });

        // Cargar fotos en la tabla
        this.photoDataSource.data = photos;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        this.openDialog('Error', 'Error al cargar el producto')
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      }
    });
  }

  ngAfterViewInit() {
    this.photoDataSource.paginator = this.paginator;
  }

  onReturn(): void {
    this.router.navigate(['/sidenavBusiness/managementProducts']);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: ProductUpdate = {
        Name: this.productForm.get('Name')?.value,
        Price: this.productForm.get('Price')?.value,
        Category: this.productForm.get('Category')?.value,
        BusinessAssociate_Legal_Id: this.businessId
      };

      this.productService.update(this.productCode, productData).subscribe({
        next: () => {
          this.openDialog('Éxito', 'Producto actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          this.openDialog('Error', 'Error al actualizar el producto');
        }
      });
    } else {
      this.openDialog('Error', 'Por favor, complete todos los campos requeridos');
    }
  }

  addPhoto(): void {
    event?.preventDefault();
    event?.stopPropagation();
    
    const dialogRef = this.dialog.open(ProductAddPhotoDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verificar si la URL ya existe
        if (this.photoDataSource.data.some(photo => photo.PhotoURL === result)) {
          this.openDialog('Error', 'Esta URL de imagen ya existe');
          return;
        }
        const newPhoto: ProductPhoto = {
          Product_Code: this.productCode,
          PhotoURL: result
        };
        this.productService.createPhoto(newPhoto).subscribe({
          next: () => {
            this.loadPhotos();
          },
          error: (error) => {
            console.error('Error al añadir la foto:', error);
            this.openDialog('Error', 'Error al añadir la foto');
          }
        });
      }
    });
  }

  editPhoto(photo: ProductPhoto): void {
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(ProductEditPhotoDialogComponent, {
      width: '500px',
      data: { url: photo.PhotoURL }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verificar si la nueva URL ya existe
        if (result !== photo.PhotoURL && 
            this.photoDataSource.data.some(p => p.PhotoURL === result)) {
          this.openDialog('Error', 'Esta URL de imagen ya existe');
          return;
        }
        this.productService.updatePhoto(
          this.productCode,
          photo.PhotoURL,
          { PhotoURL: result }
        ).subscribe({
          next: () => {
            this.openDialog('Éxito', 'Foto actualizada exitosamente')
              .afterClosed()
              .subscribe(() => {
                this.loadPhotos();
              });
          },
          error: () => {
            this.openDialog('Error', 'Error al actualizar la foto');
          }
        });
      }
    });
  }

  deletePhoto(photo: ProductPhoto): void {
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Está seguro de que desea eliminar esta foto del producto?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.photoDataSource.data.length <= 1) {
          this.openDialog('Error', 'No se puede eliminar la última foto del producto');
          return;
        }
        this.productService.deletePhoto(photo.Product_Code, photo.PhotoURL).subscribe({
          next: () => {
            this.openDialog('Éxito', 'Foto eliminada exitosamente')
              .afterClosed()
              .subscribe(() => {
                this.loadPhotos();
              });
          },
          error: () => {
            this.openDialog('Error', 'Error al eliminar la foto');
          }
        });
      }
    });
  }

  private loadPhotos(): void {
    this.productService.getPhotosByCode(this.productCode).subscribe({
      next: (photos) => {
        this.photoDataSource.data = photos;
      },
      error: () => {
        this.openDialog('Error', 'Error al cargar las fotos');
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