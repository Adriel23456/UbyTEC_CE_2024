import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface Order {
  Code: number; // PK
  State: string;
  TotalService?: number;
  Direction?: string;
  Client_Id: number;
  FoodDeliveryMan_UserId?: string;
}

export interface OrderUpdate {
  State: string;
  Client_Id: number;
  FoodDeliveryMan_UserId?: string;
}

export interface OrderCreate {
  State: string;
  Client_Id: number;
  FoodDeliveryMan_UserId?: string;
}

export interface OrderProduct {
  Order_Code: number;
  Product_Code: number;
  Amount: number;
}

export interface OrderProductUpdate {
  Amount: number;
}

export interface OrderProductCreate {
  Order_Code: number;
  Product_Code: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private comunicationService: ComunicationService
  ) {}
 
  /**
   * Obtiene todas las órdenes.
   */
  public getAll(): Observable<Order[]> {
    return this.comunicationService.getOrders().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene una orden por su código. Requiere un code
   */
  public getByCode(code: number): Observable<Order> {
    return this.comunicationService.getOrderByCode(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Crea una nueva orden. Requiere un objeto tipo OrderCreate
   */
  public create(order: OrderCreate): Observable<Order> {
    return this.comunicationService.createOrder(order).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Actualiza una orden existente. Requiere un objeto tipo OrderUpdate y un code
   */
  public update(code: number, order: OrderUpdate): Observable<void> {
    return this.comunicationService.updateOrder(code, order).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Elimina una orden.
   */
  public delete(code: number): Observable<void> {
    return this.comunicationService.deleteOrder(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  // -----------------------------------
  // Métodos para productos de la orden
  // -----------------------------------
 
  /**
   * Obtiene todos los productos de todas las órdenes.
   */
  public getAllProducts(): Observable<OrderProduct[]> {
    return this.comunicationService.getOrderProducts().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene los productos de una orden específica por su código.
   */
  public getProductsByCode(code: number): Observable<OrderProduct[]> {
    return this.comunicationService.getProductsByOrderCode(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Agrega un producto a una orden. Requiere un objeto tipo OrderProductCreate
   */
  public addProduct(orderProduct: OrderProductCreate): Observable<OrderProduct> {
    return this.comunicationService.createOrderProduct(orderProduct).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Actualiza un producto de una orden. Requiere códigos de orden y producto, y datos a actualizar
   */
  public updateProduct(orderCode: number, productCode: number, update: OrderProductUpdate): Observable<void> {
    return this.comunicationService.updateOrderProduct(orderCode, productCode, update).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Elimina un producto de una orden.
   */
  public deleteProduct(orderCode: number, productCode: number): Observable<void> {
    return this.comunicationService.deleteOrderProduct(orderCode, productCode).pipe(
      catchError(error => throwError(() => error))
    );
  }
}