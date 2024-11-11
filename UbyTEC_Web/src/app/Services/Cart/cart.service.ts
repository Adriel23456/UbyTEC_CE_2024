import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface Cart {
  Code: number; // PK
  BusinessAssociate_Legal_Id?: number;
  TotalProductsPrice: number;
  Client_Id: number;
}

export interface CartUpdate {
  Client_Id: number;
}

export interface CartCreate {
  Client_Id: number;
}

export interface CartProduct {
  Cart_Code: number; // PK
  Product_Code: number;
  Amount: number;
}

export interface CartProductUpdate {
  Amount: number;
}

export interface CartProductCreate {
  Cart_Code: number; // PK
  Product_Code: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private comunicationService: ComunicationService
  ) {}
 
  /**
   * Obtiene todos los carritos.
   */
  public getAll(): Observable<Cart[]> {
    return this.comunicationService.getCarts().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene un carrito por su código. Requiere de un code
   */
  public getByCode(code: number): Observable<Cart> {
    return this.comunicationService.getCartByCode(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Crea un nuevo carrito. Requiere de un objeto tipo CartCreate
   */
  public create(cart: CartCreate): Observable<Cart> {
    return this.comunicationService.createCart(cart).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Actualiza un carrito existente. Requiere de un objeto tipo CartUpdate y un code
   */
  public update(code: number, cart: CartUpdate): Observable<void> {
    return this.comunicationService.updateCart(code, cart).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Elimina un carrito.
   */
  public delete(code: number): Observable<void> {
    return this.comunicationService.deleteCart(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  // -----------------------------------
  // Métodos para productos del carrito
  // -----------------------------------
 
  /**
   * Obtiene todos los productos de todos los carritos.
   */
  public getAllProducts(): Observable<CartProduct[]> {
    return this.comunicationService.getCartProducts().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene los productos de un carrito específico por su código
   */
  public getProductsByCode(cartCode: number): Observable<CartProduct[]> {
    return this.comunicationService.getProductsByCartCode(cartCode).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Agrega un producto al carrito. Requiere un objeto tipo CartProductCreate.
   * Si se queire agregar 2 veces el mismo producto se puede reusar esta funcion.
   */
  public addProduct(cartProduct: CartProductCreate): Observable<CartProduct> {
    return this.comunicationService.createCartProduct(cartProduct).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Actualiza un producto del carrito. Requiere código de carrito, código de producto y los datos a actualizar
   */
  public updateProduct(cartCode: number, productCode: number, update: CartProductUpdate): Observable<void> {
    return this.comunicationService.updateCartProduct(cartCode, productCode, update).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Elimina un producto del carrito
   */
  public deleteProduct(cartCode: number, productCode: number): Observable<void> {
    return this.comunicationService.deleteCartProduct(cartCode, productCode).pipe(
      catchError(error => throwError(() => error))
    );
  }
}