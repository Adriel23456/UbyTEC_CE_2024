import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';
import { BusinessAssociate, BusinessAssociateService } from '../BusinessAssociate/business-associate.service';

export interface BusinessManager {
  Email: string; // PK
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  FullName: string; // Computed property
  Province: string;
  Canton: string;
  District: string;
  Direction: string; // Computed property
  UserId: string; // Unique
  Password: string;
}

export interface BusinessManagerUpdate {
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  UserId: string; // Unique
  Password: string;
}

export interface BusinessManagerLogin {
  Email: string; // PK
  Password: string;
}

export interface BusinessManagerCreate {
  Email: string; // PK
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  UserId: string; // Unique
  Password: string;
}

export interface BusinessManagerAuthResponse {
  BusinessManager: BusinessManager;
  BusinessAssociate: BusinessAssociate;
}

export interface BusinessManagerPhone {
  BusinessManager_Email: string; // PK
  Phone: number;
}

export interface BusinessManagerPhoneUpdate {
  Phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessManagerService {
  private currentBusinessManagerSubject: BehaviorSubject<BusinessManager | null>;
  public currentBusinessManager: Observable<BusinessManager | null>;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService,
    private businessAssociateService: BusinessAssociateService
  ) {
    const managerJson = localStorage.getItem('currentBusinessManager');
    this.currentBusinessManagerSubject = new BehaviorSubject<BusinessManager | null>(
      managerJson ? JSON.parse(managerJson) : null
    );
    this.currentBusinessManager = this.currentBusinessManagerSubject.asObservable();
  }

  public get currentBusinessManagerValue(): BusinessManager | null {
    return this.currentBusinessManagerSubject.value;
  }

  public login(credentials: BusinessManagerLogin): Observable<BusinessManagerAuthResponse> {
    return this.comunicationService.authenticateBusinessManager(credentials).pipe(
      tap(response => {
        // Guardar BusinessManager
        localStorage.setItem('currentBusinessManager', JSON.stringify(response.BusinessManager));
        this.currentBusinessManagerSubject.next(response.BusinessManager);
        // Guardar BusinessAssociate asociado
        this.businessAssociateService.login(response.BusinessAssociate).subscribe();
      }),
      catchError(error => throwError(() => error))
    );
  }

  public logout(): void {
    // Logout del BusinessAssociate primero
    this.businessAssociateService.logout();
    
    // Luego logout del BusinessManager
    localStorage.removeItem('currentBusinessManager');
    this.currentBusinessManagerSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getAll(): Observable<BusinessManager[]> {
    return this.comunicationService.getBusinessManagers().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getByEmail(email: string): Observable<BusinessManager> {
    return this.comunicationService.getBusinessManagerByEmail(email).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public create(businessManager: BusinessManagerCreate): Observable<BusinessManager> {
    return this.comunicationService.createBusinessManager(businessManager).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public update(email: string, businessManager: BusinessManagerUpdate): Observable<void> {
    return this.comunicationService.updateBusinessManager(email, businessManager).pipe(
      tap(() => {
        if (this.currentBusinessManagerValue?.Email === email) {
          const updatedManager = { ...this.currentBusinessManagerValue, ...businessManager };
          this.updateStoredBusinessManager(updatedManager);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public delete(email: string): Observable<void> {
    return this.comunicationService.deleteBusinessManager(email).pipe(
      tap(() => {
        if (this.currentBusinessManagerValue?.Email === email) {
          this.logout();
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public isAuthenticated(): boolean {
    return this.currentBusinessManagerValue !== null;
  }

  private updateStoredBusinessManager(businessManager: BusinessManager): void {
    try {
      localStorage.setItem('currentBusinessManager', JSON.stringify(businessManager));
      this.currentBusinessManagerSubject.next(businessManager);
    } catch (error) {
      throw error;
    }
  }

  public refreshCurrentBusinessManager(): Observable<BusinessManager | null> {
    if (!this.currentBusinessManagerValue) {
      return throwError(() => new Error('No hay gerente autenticado'));
    }

    return this.comunicationService.getBusinessManagerByEmail(this.currentBusinessManagerValue.Email).pipe(
      tap(businessManager => {
        const managerUpdate: BusinessManagerUpdate = {
          Name: businessManager.Name,
          FirstSurname: businessManager.FirstSurname,
          SecondSurname: businessManager.SecondSurname,
          Province: businessManager.Province,
          Canton: businessManager.Canton,
          District: businessManager.District,
          UserId: businessManager.UserId,
          Password: businessManager.Password
        };
        
        this.comunicationService.updateBusinessManager(businessManager.Email, managerUpdate).pipe(
          tap(() => {
            this.updateStoredBusinessManager(businessManager);
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
  public getAllPhones(): Observable<BusinessManagerPhone[]> {
    return this.comunicationService.getBusinessManagerPhones().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getPhonesByEmail(email: string): Observable<BusinessManagerPhone[]> {
    return this.comunicationService.getPhonesByBusinessManagerEmail(email).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public createPhone(phone: BusinessManagerPhone): Observable<BusinessManagerPhone> {
    return this.comunicationService.createBusinessManagerPhone(phone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public updatePhone(email: string, oldPhone: number, newPhone: BusinessManagerPhoneUpdate): Observable<void> {
    return this.comunicationService.updateBusinessManagerPhone(email, oldPhone, newPhone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public deletePhone(email: string, phone: number): Observable<void> {
    return this.comunicationService.deleteBusinessManagerPhone(email, phone).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
