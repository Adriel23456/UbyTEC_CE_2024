import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface BusinessType {
  Identification: number; // PK, auto-generated
  Name: string; // Unique
}

export interface BusinessTypeUpdate {
  Name: string; // Unique
}

export interface BusinessTypeCreate {
  Name: string; // Unique
}

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) {}

  /**
   * Obtiene todos los tipos de negocio.
   */
  public getAll(): Observable<BusinessType[]> {
    return this.comunicationService.getBusinessTypes().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene un tipo de negocio por su ID. Requiere de un id
   */
  public getById(id: number): Observable<BusinessType> {
    return this.comunicationService.getBusinessTypeById(id).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Crea un nuevo tipo de negocio. Requiere de un objeto tipo BusinessTypeCreate
   */
  public create(businessType: BusinessTypeCreate): Observable<BusinessType> {
    return this.comunicationService.createBusinessType(businessType).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Actualiza un tipo de negocio existente. Requiere de un objeto tipo BusinessTypeUpdate y un id
   */
  public update(id: number, businessType: BusinessTypeUpdate): Observable<void> {
    return this.comunicationService.updateBusinessType(id, businessType).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Elimina un tipo de negocio.
   */
  public delete(id: number): Observable<void> {
    return this.comunicationService.deleteBusinessType(id).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
