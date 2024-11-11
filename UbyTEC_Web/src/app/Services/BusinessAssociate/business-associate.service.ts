import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface BusinessAssociate {
  Legal_Id: number; // PK
  Email: string; // Unique
  State: string; // "Aceptado", "En espera", "Rechazado"
  BusinessName: string;
  Direction: string; // Computed property
  Province: string;
  Canton: string;
  District: string;
  SINPE: number;
  RejectReason?: string;
  BusinessManager_Email: string; // FK
  BusinessType_Identification: number; // FK
}

export interface BusinessAssociateCreate {
  Legal_Id: number; // PK
  Email: string; // Unique
  State: string; // "Aceptado", "En espera", "Rechazado"
  BusinessName: string;
  Province: string;
  Canton: string;
  District: string;
  SINPE: number;
  BusinessManager_Email: string; // FK
  BusinessType_Identification: number; // FK
}

export interface BusinessAssociateUpdate {
  Email: string; // Unique
  State: string; // "Aceptado", "En espera", "Rechazado"
  BusinessName: string;
  Province: string;
  Canton: string;
  District: string;
  SINPE: number;
  RejectReason?: string;
  BusinessManager_Email: string; // FK
  BusinessType_Identification: number; // FK
}

export interface BusinessAssociatePhone {
  BusinessAssociate_Legal_Id: number;
  Phone: number;
}

export interface BusinessAssociatePhoneUpdate {
  Phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessAssociateService {
  private currentBusinessAssociateSubject: BehaviorSubject<BusinessAssociate | null>;
  public currentBusinessAssociate: Observable<BusinessAssociate | null>;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) {
    const businessAssociateJson = localStorage.getItem('currentBusinessAssociate');
    this.currentBusinessAssociateSubject = new BehaviorSubject<BusinessAssociate | null>(
      businessAssociateJson ? JSON.parse(businessAssociateJson) : null
    );
    this.currentBusinessAssociate = this.currentBusinessAssociateSubject.asObservable();
  }

  public get currentBusinessAssociateValue(): BusinessAssociate | null {
    return this.currentBusinessAssociateSubject.value;
  }

  public login(businessAssociate: BusinessAssociate): Observable<BusinessAssociate> {
    // Como no hay authenticate, guardamos directamente
    return new Observable(subscriber => {
      localStorage.setItem('currentBusinessAssociate', JSON.stringify(businessAssociate));
      this.currentBusinessAssociateSubject.next(businessAssociate);
      subscriber.next(businessAssociate);
      subscriber.complete();
    });
  }

  public logout(): void {
    localStorage.removeItem('currentBusinessAssociate');
    this.currentBusinessAssociateSubject.next(null);
  }

  public getAll(): Observable<BusinessAssociate[]> {
    return this.comunicationService.getBusinessAssociates().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getByLegalId(legalId: number): Observable<BusinessAssociate> {
    return this.comunicationService.getBusinessAssociateByLegalId(legalId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public create(businessAssociate: BusinessAssociateCreate): Observable<BusinessAssociate> {
    return this.comunicationService.createBusinessAssociate(businessAssociate).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public update(legalId: number, businessAssociate: BusinessAssociateUpdate): Observable<void> {
    return this.comunicationService.updateBusinessAssociate(legalId, businessAssociate).pipe(
      tap(() => {
        if (this.currentBusinessAssociateValue?.Legal_Id === legalId) {
          const updatedBusinessAssociate = { ...this.currentBusinessAssociateValue, ...businessAssociate };
          this.updateStoredBusinessAssociate(updatedBusinessAssociate);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public delete(legalId: number): Observable<void> {
    return this.comunicationService.deleteBusinessAssociate(legalId).pipe(
      tap(() => {
        if (this.currentBusinessAssociateValue?.Legal_Id === legalId) {
          this.logout();
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public isAuthenticated(): boolean {
    return this.currentBusinessAssociateValue !== null;
  }

  private updateStoredBusinessAssociate(businessAssociate: BusinessAssociate): void {
    try {
      localStorage.setItem('currentBusinessAssociate', JSON.stringify(businessAssociate));
      this.currentBusinessAssociateSubject.next(businessAssociate);
    } catch (error) {
      throw error;
    }
  }

  public refreshCurrentBusinessAssociate(): Observable<BusinessAssociate | null> {
    if (!this.currentBusinessAssociateValue) {
      return throwError(() => new Error('No hay afiliado autenticado'));
    }
    return this.comunicationService.getBusinessAssociateByLegalId(this.currentBusinessAssociateValue.Legal_Id).pipe(
      tap(businessAssociate => {
        const businessAssociateUpdate: BusinessAssociateUpdate = {
          Email: businessAssociate.Email,
          State: businessAssociate.State,
          BusinessName: businessAssociate.BusinessName,
          Province: businessAssociate.Province,
          Canton: businessAssociate.Canton,
          District: businessAssociate.District,
          SINPE: businessAssociate.SINPE,
          RejectReason: businessAssociate.RejectReason,
          BusinessManager_Email: businessAssociate.BusinessManager_Email,
          BusinessType_Identification: businessAssociate.BusinessType_Identification
        };
        this.comunicationService.updateBusinessAssociate(businessAssociate.Legal_Id, businessAssociateUpdate).pipe(
          tap(() => {
            this.updateStoredBusinessAssociate(businessAssociate);
          })
        ).subscribe();
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  // Métodos para teléfonos
  public getAllPhones(): Observable<BusinessAssociatePhone[]> {
    return this.comunicationService.getBusinessAssociatePhones().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getPhonesByLegalId(legalId: number): Observable<BusinessAssociatePhone[]> {
    return this.comunicationService.getPhonesByBusinessAssociateLegalId(legalId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public createPhone(phone: BusinessAssociatePhone): Observable<BusinessAssociatePhone> {
    return this.comunicationService.createBusinessAssociatePhone(phone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public updatePhone(legalId: number, oldPhone: number, newPhone: BusinessAssociatePhoneUpdate): Observable<void> {
    return this.comunicationService.updateBusinessAssociatePhone(legalId, oldPhone, newPhone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public deletePhone(legalId: number, phone: number): Observable<void> {
    return this.comunicationService.deleteBusinessAssociatePhone(legalId, phone).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
