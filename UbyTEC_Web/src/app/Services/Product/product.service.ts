import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface Product {
  Code?: number | null; // PK
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
      map(photos => this.decodePhotos(photos)),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene las fotos de un producto específico por su código de producto
   */
  public getPhotosByCode(productCode: number): Observable<ProductPhoto[]> {
    return this.comunicationService.getPhotosByProductCode(productCode).pipe(
      map(photos => this.decodePhotos(photos)),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Crea una nueva foto para un producto
   */
  public createPhoto(photo: ProductPhoto): Observable<ProductPhoto> {
    const encodedPhoto = {
      ...photo,
      PhotoURL: this.encodePhotoUrl(photo.PhotoURL)
    };
    return this.comunicationService.createProductPhoto(encodedPhoto).pipe(
      map(createdPhoto => ({
        ...createdPhoto,
        PhotoURL: this.decodePhotoUrl(createdPhoto.PhotoURL)
      })),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Actualiza una foto de producto existente
   */
  public updatePhoto(productCode: number, oldPhotoUrl: string, update: ProductPhotoUpdate): Observable<void> {
    const encodedOldUrl = this.encodePhotoUrl(oldPhotoUrl);
    const encodedUpdate = {
      PhotoURL: this.encodePhotoUrl(update.PhotoURL)
    };
    return this.comunicationService.updateProductPhoto(
      productCode,
      encodedOldUrl,
      encodedUpdate
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Elimina una foto de producto
   */
  public deletePhoto(productCode: number, photoUrl: string): Observable<void> {
    const encodedUrl = this.encodePhotoUrl(photoUrl);
    return this.comunicationService.deleteProductPhoto(productCode, encodedUrl).pipe(
      catchError(error => throwError(() => error))
    );
  }

  // Método auxiliar para codificar URLs utilizando '***' en lugar de '%'
  private encodePhotoUrl(url: string): string {
    try {
      const encoded = url
        .replace(/\./g, '***2E')      // Codificar puntos
        .replace(/\//g, '***2F')      // Codificar slashes
        .replace(/\?/g, '***3F')      // Codificar signos de interrogación
        .replace(/\(/g, '***28')      // Codificar paréntesis
        .replace(/\)/g, '***29')      // Codificar paréntesis
        .replace(/!/g, '***21')       // Codificar exclamación
        .replace(/'/g, '***27')       // Codificar comillas simples
        .replace(/"/g, '***22')       // Codificar comillas dobles
        .replace(/~/g, '***7E')       // Codificar tilde
        .replace(/\[/g, '***5B')      // Codificar corchetes
        .replace(/\]/g, '***5D')      // Codificar corchetes
        .replace(/@/g, '***40')       // Codificar arroba
        .replace(/\s/g, '***20')      // Codificar espacios
        .replace(/\+/g, '***2B')      // Codificar signos más
        .replace(/\*/g, '***2A')      // Codificar asteriscos
        .replace(/,/g, '***2C')       // Codificar comas
        .replace(/;/g, '***3B')       // Codificar punto y coma
        .replace(/:/g, '***3A')       // Codificar dos puntos
        .replace(/=/g, '***3D');      // Codificar igual
      return encoded;
    } catch (error) {
      console.error('Error codificando URL:', error);
      return url; // Devolver la URL original si hay error
    }
  }

  // Método auxiliar para decodificar URLs utilizando '***' en lugar de '%'
  private decodePhotoUrl(url: string): string {
    try {
      const decoded = url
        .replace(/\*\*\*2E/g, '.')      // Decodificar puntos
        .replace(/\*\*\*2F/g, '/')      // Decodificar slashes
        .replace(/\*\*\*3F/g, '?')      // Decodificar signos de interrogación
        .replace(/\*\*\*28/g, '(')      // Decodificar paréntesis
        .replace(/\*\*\*29/g, ')')      // Decodificar paréntesis
        .replace(/\*\*\*21/g, '!')      // Decodificar exclamación
        .replace(/\*\*\*27/g, '\'')     // Decodificar comillas simples
        .replace(/\*\*\*22/g, '"')      // Decodificar comillas dobles
        .replace(/\*\*\*7E/g, '~')      // Decodificar tilde
        .replace(/\*\*\*5B/g, '[')      // Decodificar corchetes
        .replace(/\*\*\*5D/g, ']')      // Decodificar corchetes
        .replace(/\*\*\*40/g, '@')      // Decodificar arroba
        .replace(/\*\*\*20/g, ' ')      // Decodificar espacios
        .replace(/\*\*\*2B/g, '+')      // Decodificar signos más
        .replace(/\*\*\*2A/g, '*')      // Decodificar asteriscos
        .replace(/\*\*\*2C/g, ',')      // Decodificar comas
        .replace(/\*\*\*3B/g, ';')      // Decodificar punto y coma
        .replace(/\*\*\*3A/g, ':')      // Decodificar dos puntos
        .replace(/\*\*\*3D/g, '=');     // Decodificar igual
      return decoded;
    } catch (error) {
      console.error('Error decodificando URL:', error);
      return url; // Devolver la URL original si hay error
    }
  }

  // Método auxiliar para decodificar fotos con manejo de errores
  private decodePhotos(photos: ProductPhoto[]): ProductPhoto[] {
    return photos.map(photo => {
      try {
        return {
          ...photo,
          PhotoURL: this.decodePhotoUrl(this.decodePhotoUrl(this.decodePhotoUrl(photo.PhotoURL)))
        };
      } catch (error) {
        console.error('Error decodificando foto:', error);
        return photo; // Devolver la foto sin modificar si hay error
      }
    });
  }
}
