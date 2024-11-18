import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface Client {
  Id: number; // PK
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
  Phone: number;
  BirthDate: string; // Format "dd-mm-yyyy"
}

export interface ClientCreate {
  Id: number; // PK
  UserId: string; // Unique
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  Password: string;
  Phone: number;
  BirthDate: string; // Format "dd-mm-yyyy"
}

export interface ClientLogin {
  UserId: string;
  Password: string;
}

export interface ClientUpdate {
  UserId: string; // Unique
  Name: string;
  FirstSurname: string;
  SecondSurname: string;
  Province: string;
  Canton: string;
  District: string;
  Password: string;
  Phone: number;
  BirthDate: string; // Format "dd-mm-yyyy"
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private currentClientSubject: BehaviorSubject<Client | null>;
  public currentClient: Observable<Client | null>;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) {
    // Inicializa el BehaviorSubject para el client actual
    const clientJson = localStorage.getItem('currentClient');
    this.currentClientSubject = new BehaviorSubject<Client | null>(clientJson ? JSON.parse(clientJson) : null);
    this.currentClient = this.currentClientSubject.asObservable();
  }

  /**
   * Obtiene el cliente actualmente autenticado.
   */
  public get currentClientValue(): Client | null {
    return this.currentClientSubject.value;
  }

  /**
   * Inicia sesión del cliente. Requiere de un objeto tipo ClientLogin
   */
  public login(clientLogin: ClientLogin): Observable<Client> {
    return this.comunicationService.authenticateClient(clientLogin).pipe(
      tap(response => {
        localStorage.setItem('currentClient', JSON.stringify(response));
        this.currentClientSubject.next(response);
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Cierra la sesión del cliente actual.
   */
  public logout(): void {
    localStorage.removeItem('currentClient');
    this.currentClientSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  /**
   * Obtiene todos los clientes.
   */
  public getAll(): Observable<Client[]> {
    return this.comunicationService.getClients().pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Obtiene un cliente por su ID. Requiere de un id
   */
  public getById(id: number): Observable<Client> {
    return this.comunicationService.getClientById(id).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Crea un nuevo cliente. Requiere de un objeto tipo ClientCreate
   */
  public create(client: ClientCreate): Observable<Client> {
    return this.comunicationService.createClient(client).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Actualiza un cliente existente. Requiere de un objeto tipo ClientUpdate y un id
   */
  public update(id: number, client: ClientUpdate): Observable<void> {
    return this.comunicationService.updateClient(id, client).pipe(
      tap(() => {
        if (this.currentClientValue?.Id === id) {
          const updatedClient = { ...this.currentClientValue, ...client };
          this.updateStoredClient(updatedClient);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Elimina un cliente.
   */
  public delete(id: number): Observable<void> {
    return this.comunicationService.deleteClient(id).pipe(
      tap(() => {
        if (this.currentClientValue?.Id === id) {
          this.logout();
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Verifica si hay un cliente autenticado.
   */
  public isAuthenticated(): boolean {
    return this.currentClientValue !== null;
  }

  /**
   * Actualiza el cliente en memoria y localStorage
   */
  private updateStoredClient(client: Client): void {
    try {
      localStorage.setItem('currentClient', JSON.stringify(client));
      this.currentClientSubject.next(client);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Recarga los datos del cliente actual desde el servidor
   * @returns Observable con el cliente actualizado o null si hay error
   */
  public refreshCurrentClient(): Observable<Client | null> {
    if (!this.currentClientValue) {
      return throwError(() => new Error('No hay cliente autenticado'));
    }

    return this.comunicationService.getClientById(this.currentClientValue.Id).pipe(
      tap(client => {
        const clientUpdate: ClientUpdate = {
          UserId: client.UserId,
          Name: client.Name,
          FirstSurname: client.FirstSurname,
          SecondSurname: client.SecondSurname,
          Province: client.Province,
          Canton: client.Canton,
          District: client.District,
          Password: client.Password,
          Phone: client.Phone,
          BirthDate: client.BirthDate
        };
        
        this.comunicationService.updateClient(client.Id, clientUpdate).pipe(
          tap(() => {
            this.updateStoredClient(client);
          })
        ).subscribe();
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }
}
