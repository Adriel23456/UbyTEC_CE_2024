import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';
import { BusinessAssociate } from '../BusinessAssociate/business-associate.service';

export interface ConsolidatedSalesReport {
  ClientId: number;
  ClientName: string;
  Affiliate: string;
  Purchases: number;
  Conductor: string;
  TotalAmount: number;
  ServiceAmount: number;
}

export interface SalesReportByAffiliate {
  Affiliate: string; // PK
  Purchases: number;
  TotalAmount: number;
  ServiceAmount: number;
}

export interface TopSellingProducts {
  ProductName: string; // PK
  Affiliate: string;
  TotalSold: number;
  TotalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(
    private comunicationService: ComunicationService
  ) { }

  /**
   * Obtiene el reporte de ventas consolidado.
   */
  public getConsolidatedSalesReport(): Observable<ConsolidatedSalesReport[]> {
    return this.comunicationService.getConsolidatedSalesReport().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene el reporte de ventas por afiliado.
   */
  public getSalesReportByAffiliate(): Observable<SalesReportByAffiliate[]> {
    return this.comunicationService.getSalesReportByAffiliate().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene los productos más vendidos.
   */
  public getTopSellingProducts(): Observable<TopSellingProducts[]> {
    return this.comunicationService.getTopSellingProducts().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Asigna una orden a un repartidor.
   * @param orderCode Código de la orden a asignar.
   */
  public assignOrderToDeliveryMan(orderCode: number): Observable<void> {
    return this.comunicationService.assignOrderToDeliveryMan(orderCode).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Marca una orden como recibida por el cliente.
   * @param orderCode Código de la orden recibida.
   */
  public receiveOrderByClient(orderCode: number): Observable<void> {
    return this.comunicationService.receiveOrderByClient(orderCode).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene las empresas filtradas por ubicación del cliente y un filtro opcional.
   * @param clientId ID del cliente.
   * @param filter Filtro opcional para las empresas.
   */
  public getBusinessesByFilterAndClientLocation(clientId: number, filter?: string): Observable<BusinessAssociate[]> {
    return this.comunicationService.getBusinessesByFilterAndClientLocation(clientId, filter).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
