import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface FoodDeliveryMan {
  UserId: string; // Unique
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  FullName: string; // Computed property
  Province: string;
  Canton: string;
  District: string;
  Direction: string; // Computed property
  Password: string;
  State: string; // "Disponible" or "No disponible"
}

export interface FoodDeliveryManCreate {
  UserId: string; // Unique
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  Password: string;
  State: string; // "Disponible" or "No disponible"
}

export interface FoodDeliveryManLogin {
  UserId: string; // Unique
  Password: string;
}

export interface FoodDeliveryManUpdate {
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  Password: string;
  State: string; // "Disponible" or "No disponible"
}

export interface FoodDeliveryManPhone {
  FoodDeliveryMan_UserId: string;
  Phone: number;
}

export interface FoodDeliveryManPhoneUpdate {
  Phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodDeliveryManService {
  private currentDeliveryManSubject: BehaviorSubject<FoodDeliveryMan | null>;
  public currentDeliveryMan: Observable<FoodDeliveryMan | null>;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) {
    const deliveryManJson = localStorage.getItem('currentDeliveryMan');
    this.currentDeliveryManSubject = new BehaviorSubject<FoodDeliveryMan | null>(
      deliveryManJson ? JSON.parse(deliveryManJson) : null
    );
    this.currentDeliveryMan = this.currentDeliveryManSubject.asObservable();
  }

  public get currentDeliveryManValue(): FoodDeliveryMan | null {
    return this.currentDeliveryManSubject.value;
  }

  public login(credentials: FoodDeliveryManLogin): Observable<FoodDeliveryMan> {
    return this.comunicationService.authenticateFoodDeliveryMan(credentials).pipe(
      tap(response => {
        localStorage.setItem('currentDeliveryMan', JSON.stringify(response));
        this.currentDeliveryManSubject.next(response);
      }),
      catchError(error => throwError(() => error))
    );
  }

  public logout(): void {
    localStorage.removeItem('currentDeliveryMan');
    this.currentDeliveryManSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getAll(): Observable<FoodDeliveryMan[]> {
    return this.comunicationService.getFoodDeliveryMen().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getByUserId(userId: string): Observable<FoodDeliveryMan> {
    return this.comunicationService.getFoodDeliveryManByUserId(userId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public create(deliveryMan: FoodDeliveryManCreate): Observable<FoodDeliveryMan> {
    return this.comunicationService.createFoodDeliveryMan(deliveryMan).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public update(userId: string, deliveryMan: FoodDeliveryManUpdate): Observable<void> {
    return this.comunicationService.updateFoodDeliveryMan(userId, deliveryMan).pipe(
      tap(() => {
        if (this.currentDeliveryManValue?.UserId === userId) {
          const updatedDeliveryMan = { ...this.currentDeliveryManValue, ...deliveryMan };
          this.updateStoredDeliveryMan(updatedDeliveryMan);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public delete(userId: string): Observable<void> {
    return this.comunicationService.deleteFoodDeliveryMan(userId).pipe(
      tap(() => {
        if (this.currentDeliveryManValue?.UserId === userId) {
          this.logout();
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public isAuthenticated(): boolean {
    return this.currentDeliveryManValue !== null;
  }

  private updateStoredDeliveryMan(deliveryMan: FoodDeliveryMan): void {
    try {
      localStorage.setItem('currentDeliveryMan', JSON.stringify(deliveryMan));
      this.currentDeliveryManSubject.next(deliveryMan);
    } catch (error) {
      throw error;
    }
  }

  public refreshCurrentDeliveryMan(): Observable<FoodDeliveryMan | null> {
    if (!this.currentDeliveryManValue) {
      return throwError(() => new Error('No hay repartidor autenticado'));
    }

    return this.comunicationService.getFoodDeliveryManByUserId(this.currentDeliveryManValue.UserId).pipe(
      tap(deliveryMan => {
        const deliveryManUpdate: FoodDeliveryManUpdate = {
          Name: deliveryMan.Name,
          FirstSurname: deliveryMan.FirstSurname,
          SecondSurname: deliveryMan.SecondSurname,
          Province: deliveryMan.Province,
          Canton: deliveryMan.Canton,
          District: deliveryMan.District,
          Password: deliveryMan.Password,
          State: deliveryMan.State
        };
        
        this.comunicationService.updateFoodDeliveryMan(deliveryMan.UserId, deliveryManUpdate).pipe(
          tap(() => {
            this.updateStoredDeliveryMan(deliveryMan);
          })
        ).subscribe();
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  // Métodos adicionales para teléfonos
  public getAllPhones(): Observable<FoodDeliveryManPhone[]> {
    return this.comunicationService.getFoodDeliveryManPhones().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getPhonesByUserId(userId: string): Observable<FoodDeliveryManPhone[]> {
    return this.comunicationService.getPhonesByFoodDeliveryManUserId(userId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public createPhone(phone: FoodDeliveryManPhone): Observable<FoodDeliveryManPhone> {
    return this.comunicationService.createFoodDeliveryManPhone(phone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public updatePhone(userId: string, oldPhone: number, newPhone: FoodDeliveryManPhoneUpdate): Observable<void> {
    return this.comunicationService.updateFoodDeliveryManPhone(userId, oldPhone, newPhone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public deletePhone(userId: string, phone: number): Observable<void> {
    return this.comunicationService.deleteFoodDeliveryManPhone(userId, phone).pipe(
      catchError(error => throwError(() => error))
    );
  }
}