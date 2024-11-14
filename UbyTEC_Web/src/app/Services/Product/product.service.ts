import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Product {
  Code?: number; // PK
  Name: string;
  Price: number;
  Category: string;
  BusinessAssociate_Legal_Id: number;
}

export interface ProductUpdate {
  Name: string;
  Price: number;
  Category: string;
  BusinessAssociate_Legal_Id: number;
}

export interface ProductCreate {
  Name: string;
  Price: number;
  Category: string;
  BusinessAssociate_Legal_Id: number;
}

export interface ProductPhoto {
  Product_Code: number;
  PhotoURL: string;
}

export interface ProductPhotoUpdate {
  PhotoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private comunicationService: ComunicationService
  ) { }

  form: FormGroup = new FormGroup ({
    Name: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    BusinessAssociate_Legal_Id: new FormControl(118890392, Validators.required),
  })
  /**
    * Obtiene todos los productos.
    */
  public getAll(): Observable<Product[]> {
    return this.comunicationService.getProducts().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene un producto por su código. Requiere un code
   */
  public getByCode(code: number): Observable<Product> {
    return this.comunicationService.getProductByCode(code).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Crea un nuevo producto. Requiere un objeto tipo ProductCreate
   */
  public create(product: ProductCreate): Observable<Product> {
    return this.comunicationService.createProduct(product).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Actualiza un producto existente. Requiere un objeto tipo ProductUpdate y un code
   */
  public update(code: number, product: ProductUpdate): Observable<void> {
    return this.comunicationService.updateProduct(code, product).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Elimina un producto.
   */
  public delete(code: number): Observable<void> {
    return this.comunicationService.deleteProduct(code).pipe(
      catchError(error => throwError(() => error))
    );
  }

  // -----------------------------------
  // Métodos para ProductPhoto
  // -----------------------------------

  /**
   * Obtiene todas las fotos de productos.
   */
  public getAllPhotos(): Observable<ProductPhoto[]> {
    return this.comunicationService.getProductPhotos().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene las fotos de un producto específico por su código
   */
  public getPhotosByCode(productCode: number): Observable<ProductPhoto[]> {
    return this.comunicationService.getPhotosByProductCode(productCode).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Crea una nueva foto para un producto
   */
  public createPhoto(photo: ProductPhoto): Observable<ProductPhoto> {
    return this.comunicationService.createProductPhoto(photo).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Actualiza una foto de producto existente
   */
  public updatePhoto(productCode: number, oldPhotoUrl: string, update: ProductPhotoUpdate): Observable<void> {
    return this.comunicationService.updateProductPhoto(productCode, oldPhotoUrl, update).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Elimina una foto de producto
   */
  public deletePhoto(productCode: number, photoUrl: string): Observable<void> {
    return this.comunicationService.deleteProductPhoto(productCode, photoUrl).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
