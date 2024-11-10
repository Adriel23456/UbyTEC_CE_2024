import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Client, ClientCreate, ClientLogin, ClientUpdate } from '../Client/client.service';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private apiUrl = 'http://localhost:5500/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Maneja los errores de las solicitudes HTTP.
   * @param operation Nombre de la operación que falló.
   * @returns Función que maneja el error.
   */
  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente o de la red
        console.error(`${operation} - Error de cliente:`, error.error.message);
      } else {
        // Error del lado del servidor
        console.error(`${operation} - Código de estado: ${error.status}, ` +
                      `Error: ${error.error.message || error.message}`);
      }
      // Retorna un observable con un mensaje de error amigable
      return throwError(() => new Error(`${operation} falló: ${error.error.message || error.message}`));
    };
  }

  // -----------------------------------
  // Métodos para Client (Identificado por id)
  // -----------------------------------

  /**
   * Obtiene todos los clientes.
   * @returns Observable con la lista de clientes.
   */
  getClients(): Observable<Client[]> {
    const operation = 'GET Clients';
    return this.http.get<Client[]>(`${this.apiUrl}/Client`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un cliente específico por su Id.
   * @param id Identificador único del cliente.
   * @returns Observable con el cliente solicitado.
   */
  getClientById(id: number): Observable<Client> {
    const operation = `GET User By ID: ${id}`;
    return this.http.get<Client>(`${this.apiUrl}/Client/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo cliente.
   * @param clientCreate Objeto de tipo ClientCreate para crear el cliente.
   * @returns Observable con el cliente creado.
   */
  createClient(clientCreate: ClientCreate): Observable<Client> {
    const operation = 'POST Create Client';
    return this.http.post<Client>(
      `${this.apiUrl}/Client`,
      clientCreate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un cliente existente.
   * @param id Identificador único del cliente.
   * @param clientUpdate Objeto de tipo ClientUpdate con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateClient(id: number, clientUpdate: ClientUpdate): Observable<void> {
    const operation = `PUT Update Client ID: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/Client/${id}`,
      clientUpdate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un cliente por su ID.
   * @param id Identificador único del cliente a eliminar.
   * @returns Observable vacío que completa cuando la eliminación es exitosa.
   */
  deleteClient(id: number): Observable<void> {
    const operation = `DELETE Client ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Client/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Autentica un cliente usando sus credenciales.
   * @param credentials Objeto con UserId y Password del cliente.
   * @returns Observable con los datos del cliente autenticado.
   */
  authenticateClient(credentials: ClientLogin): Observable<Client> {
    const operation = 'POST Authenticate Client';
    return this.http.post<Client>(
      `${this.apiUrl}/Client/Authenticate`,
      credentials,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }
}
