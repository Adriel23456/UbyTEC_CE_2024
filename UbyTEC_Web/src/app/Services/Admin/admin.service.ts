import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface Admin {
  Id: number; // PK
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  FullName: string; // Computed property
  Province: string;
  Canton: string;
  District: string;
  Direction: string; // Computed property
  UserID: string; // Unique
  Password: string;
}

export interface AdminCreate {
  Id: number; // PK
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  UserID: string; // Unique
  Password: string;
}

export interface AdminLogin {
  UserID: string; // Unique
  Password: string;
}

export interface AdminUpdate {
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  UserID: string; // Unique
  Password: string;
}

export interface AdminPhone {
  Admin_id: number;
  Phone: number;
}

export interface AdminPhoneUpdate {
  Phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentAdminSubject: BehaviorSubject<Admin | null>;
  public currentAdmin: Observable<Admin | null>;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) {
    const adminJson = localStorage.getItem('currentAdmin');
    this.currentAdminSubject = new BehaviorSubject<Admin | null>(adminJson ? JSON.parse(adminJson) : null);
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public get currentAdminValue(): Admin | null {
    return this.currentAdminSubject.value;
  }

  public login(adminLogin: AdminLogin): Observable<Admin> {
    return this.comunicationService.authenticateAdmin(adminLogin).pipe(
      tap(response => {
        localStorage.setItem('currentAdmin', JSON.stringify(response));
        this.currentAdminSubject.next(response);
      }),
      catchError(error => throwError(() => error))
    );
  }

  public logout(): void {
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getAll(): Observable<Admin[]> {
    return this.comunicationService.getAdmins().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getById(id: number): Observable<Admin> {
    return this.comunicationService.getAdminById(id).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public create(admin: AdminCreate): Observable<Admin> {
    return this.comunicationService.createAdmin(admin).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public update(id: number, admin: AdminUpdate): Observable<void> {
    return this.comunicationService.updateAdmin(id, admin).pipe(
      tap(() => {
        if (this.currentAdminValue?.Id === id) {
          const updatedAdmin = { ...this.currentAdminValue, ...admin };
          this.updateStoredAdmin(updatedAdmin);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public delete(id: number): Observable<void> {
    return this.comunicationService.deleteAdmin(id).pipe(
      tap(() => {
        if (this.currentAdminValue?.Id === id) {
          this.logout();
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  public isAuthenticated(): boolean {
    return this.currentAdminValue !== null;
  }

  private updateStoredAdmin(admin: Admin): void {
    try {
      localStorage.setItem('currentAdmin', JSON.stringify(admin));
      this.currentAdminSubject.next(admin);
    } catch (error) {
      throw error;
    }
  }

  public refreshCurrentAdmin(): Observable<Admin | null> {
    if (!this.currentAdminValue) {
      return throwError(() => new Error('No hay administrador autenticado'));
    }

    return this.comunicationService.getAdminById(this.currentAdminValue.Id).pipe(
      tap(admin => {
        const adminUpdate: AdminUpdate = {
          UserID: admin.UserID,
          Name: admin.Name,
          FirstSurname: admin.FirstSurname,
          SecondSurname: admin.SecondSurname,
          Province: admin.Province,
          Canton: admin.Canton,
          District: admin.District,
          Password: admin.Password
        };
        
        this.comunicationService.updateAdmin(admin.Id, adminUpdate).pipe(
          tap(() => {
            this.updateStoredAdmin(admin);
          })
        ).subscribe();
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  // Métodos adicionales para AdminPhone
  public getAllPhones(): Observable<AdminPhone[]> {
    return this.comunicationService.getAdminPhones().pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getPhonesByAdminId(adminId: number): Observable<AdminPhone[]> {
    return this.comunicationService.getPhonesByAdminId(adminId).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public createPhone(adminPhone: AdminPhone): Observable<AdminPhone> {
    return this.comunicationService.createAdminPhone(adminPhone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public updatePhone(adminId: number, oldPhone: number, newPhone: AdminPhoneUpdate): Observable<void> {
    return this.comunicationService.updateAdminPhone(adminId, oldPhone, newPhone).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public deletePhone(adminId: number, phone: number): Observable<void> {
    return this.comunicationService.deleteAdminPhone(adminId, phone).pipe(
      catchError(error => throwError(() => error))
    );
  }
}