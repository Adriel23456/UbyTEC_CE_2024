import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Login/dialog/dialog.component';
import { ProductService, ProductCreate } from '../../../Services/Product/product.service';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { ProductAddPhotoDialogComponent } from '../product-add-photo-dialog/product-add-photo-dialog.component';
import { ProductEditPhotoDialogComponent } from '../product-edit-photo-dialog/product-edit-photo-dialog.component';

@Component({
  selector: 'app-product-create',
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
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  photoDataSource = new MatTableDataSource<string>([]);
  displayedColumns: string[] = ['url', 'edit', 'delete'];
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
    private router: Router
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
    this.productForm.patchValue({
      BusinessAssociate_Legal_Id: this.businessId
    });
  }

  ngAfterViewInit() {
    this.photoDataSource.paginator = this.paginator;
  }

  onReturn(): void {
    this.router.navigate(['/sidenavBusiness/managementProducts']);
  }

  addPhoto(): void {
    // Prevenir la validación del formulario principal
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(ProductAddPhotoDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const currentPhotos = this.photoDataSource.data;
        // Verificar si la URL ya existe
        if (currentPhotos.includes(result)) {
          this.openDialog('Error', 'Esta URL de imagen ya existe');
          return;
        }
        this.photoDataSource.data = [...currentPhotos, result];
      }
    });
  }

  editPhoto(url: string): void {
    // Prevenir la validación del formulario principal
    event?.preventDefault();
    event?.stopPropagation();
    
    const dialogRef = this.dialog.open(ProductEditPhotoDialogComponent, {
      width: '500px',
      data: { url }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const currentPhotos = this.photoDataSource.data;
        // Verificar si la nueva URL ya existe (excluyendo la URL actual)
        if (result !== url && currentPhotos.includes(result)) {
          this.openDialog('Error', 'Esta URL de imagen ya existe');
          return;
        }
        const index = currentPhotos.indexOf(url);
        if (index !== -1) {
          currentPhotos[index] = result;
          this.photoDataSource.data = [...currentPhotos];
        }
      }
    });
  }

  deletePhoto(url: string): void {
    // Prevenir la validación del formulario principal
    event?.preventDefault();
    event?.stopPropagation();
    const currentPhotos = this.photoDataSource.data.filter(photo => photo !== url);
    this.photoDataSource.data = currentPhotos;
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }

  onSubmit(): void {
    if (this.photoDataSource.data.length === 0) {
      this.openDialog('Error', 'Debe agregar al menos una foto del producto');
      return;
    }
    if (this.productForm.valid) {
      const productData: ProductCreate = {
        Name: this.productForm.get('Name')?.value,
        Price: this.productForm.get('Price')?.value,
        Category: this.productForm.get('Category')?.value,
        BusinessAssociate_Legal_Id: this.businessId
      };
      // 1. Crear el producto
      this.productService.create(productData).subscribe({
        next: (createdProduct) => {
          if (!createdProduct.Code) {
            this.openDialog('Error', 'No se pudo obtener el código del producto creado');
            return;
          }
          // 2. Comenzar a añadir las fotos secuencialmente
          this.createNextPhoto(createdProduct.Code, 0);
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          this.openDialog('Error', 'Error al crear el producto');
        }
      });
    } else {
      this.openDialog('Error', 'Por favor, complete todos los campos requeridos');
    }
  }
  
  private createNextPhoto(productCode: number, index: number): void {
    const photos = this.photoDataSource.data;
    // Si ya procesamos todas las fotos, mostrar éxito y redirigir
    if (index >= photos.length) {
      this.openDialog('Éxito', 'Producto creado exitosamente con todas sus fotos')
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/sidenavBusiness/managementProducts']);
        });
      return;
    }
    // Crear la foto actual
    const photoData = {
      Product_Code: productCode,
      PhotoURL: photos[index]
    };
    this.productService.createPhoto(photoData).subscribe({
      next: () => {
        // Crear la siguiente foto
        this.createNextPhoto(productCode, index + 1);
      },
      error: (error) => {
        console.error('Error al crear foto:', error);
        this.openDialog('Error', 'Error al añadir las fotos al producto');
      }
    });
  }
}