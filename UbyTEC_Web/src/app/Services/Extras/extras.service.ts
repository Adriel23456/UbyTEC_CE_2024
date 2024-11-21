import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';
import { Order } from '../Order/order.service';
import { Product } from '../Product/product.service';
import { Cart } from '../Cart/cart.service';
import { BusinessType } from '../BusinessType/business-type.service';
import { FoodDeliveryMan } from '../FoodDeliveryMan/food-delivery-man.service';
import { Client } from '../Client/client.service';
import { BusinessAssociate } from '../BusinessAssociate/business-associate.service';
import { BusinessManager } from '../BusinessManager/business-manager.service';
import { Admin } from '../Admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  constructor(
    private comunicationService: ComunicationService
  ) { }

  /**
   * Obtiene administradores filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Admin filtrados.
   */
  public getAdminsByFilter(filter: string): Observable<Admin[]> {
    return this.comunicationService.getAdminsByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene business associates filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessAssociate filtrados.
   */
  public getBusinessAssociatesByFilter(filter: string): Observable<BusinessAssociate[]> {
    return this.comunicationService.getBusinessAssociatesByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene business managers filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessManager filtrados.
   */
  public getBusinessManagersByFilter(filter: string): Observable<BusinessManager[]> {
    return this.comunicationService.getBusinessManagersByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene business associates aceptados filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessAssociate aceptados filtrados.
   */
  public getAcceptedBusinessAssociatesByFilter(filter: string): Observable<BusinessAssociate[]> {
    return this.comunicationService.getAcceptedBusinessAssociatesByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene clientes filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Client filtrados.
   */
  public getClientsByFilter(filter: string): Observable<Client[]> {
    return this.comunicationService.getClientsByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene food delivery men filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de FoodDeliveryMan filtrados.
   */
  public getFoodDeliveryMenByFilter(filter: string): Observable<FoodDeliveryMan[]> {
    return this.comunicationService.getFoodDeliveryMenByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene business types filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessType filtrados.
   */
  public getBusinessTypesByFilter(filter: string): Observable<BusinessType[]> {
    return this.comunicationService.getBusinessTypesByFilter(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene órdenes filtradas por nombre de cliente, negocio y estado.
   * @param businessId ID del negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Order filtrados.
   */
  public getOrdersByClientNameAndBusinessAndState(businessId: number, filter: string | null): Observable<Order[]> {
    return this.comunicationService.getOrdersByClientNameAndBusinessAndState(businessId, filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene órdenes filtradas por nombre de cliente, negocio y filtros de estado.
   * @param businessId ID del negocio.
   * @param clientFilter Filtro para el cliente.
   * @param stateFilter Filtro para el estado.
   * @returns Observable con la lista de Order filtrados.
   */
  public getOrdersByClientNameBusinessAndStateFilter(businessId: number, clientFilter: string, stateFilter: string): Observable<Order[]> {
    return this.comunicationService.getOrdersByClientNameBusinessAndStateFilter(businessId, clientFilter, stateFilter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene productos filtrados por nombre y negocio.
   * @param businessId ID del negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Product filtrados.
   */
  public getProductsByNameAndBusiness(businessId: number, filter: string): Observable<Product[]> {
    return this.comunicationService.getProductsByNameAndBusiness(businessId, filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene carritos filtrados por nombre de negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Cart filtrados.
   */
  public getCartsByBusinessName(filter: string): Observable<Cart[]> {
    return this.comunicationService.getCartsByBusinessName(filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene productos de un carrito filtrados por un criterio.
   * @param cartCode Código del carrito.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de Product filtrados.
   */
  public getProductsByCartAndFilter(cartCode: number, filter: string): Observable<Product[]> {
    return this.comunicationService.getProductsByCartAndFilter(cartCode, filter).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene las últimas 10 órdenes de un cliente.
   * @param clientId ID del cliente.
   * @returns Observable con la lista de Order.
   */
  public getLast10OrdersByClient(clientId: number): Observable<Order[]> {
    return this.comunicationService.getLast10OrdersByClient(clientId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene órdenes filtradas por una fecha específica.
   * @param dateFilter Filtro de fecha.
   * @returns Observable con la lista de Order filtrados.
   */
  public getOrdersByDateFilter(dateFilter: string): Observable<Order[]> {
    return this.comunicationService.getOrdersByDateFilter(dateFilter).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
