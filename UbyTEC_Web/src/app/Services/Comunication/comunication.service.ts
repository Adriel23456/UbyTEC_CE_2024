import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Client, ClientCreate, ClientLogin, ClientUpdate } from '../Client/client.service';
import { Admin, AdminCreate, AdminLogin, AdminPhone, AdminPhoneUpdate, AdminUpdate } from '../Admin/admin.service';

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

  // -----------------------------------
  // Métodos para Admin (Identificado por id)
  // -----------------------------------

  /**
   * Obtiene todos los administradores.
   * @returns Observable con la lista de administradores.
   */
  getAdmins(): Observable<Admin[]> {
    const operation = 'GET Admins';
    return this.http.get<Admin[]>(`${this.apiUrl}/Admin`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un administrador específico por su Id.
   * @param id Identificador único del administrador.
   * @returns Observable con el administrador solicitado.
   */
  getAdminById(id: number): Observable<Admin> {
    const operation = `GET Admin By ID: ${id}`;
    return this.http.get<Admin>(`${this.apiUrl}/Admin/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo administrador.
   * @param adminCreate Objeto de tipo AdminCreate para crear el administrador.
   * @returns Observable con el administrador creado.
   */
  createAdmin(adminCreate: AdminCreate): Observable<Admin> {
    const operation = 'POST Create Admin';
    return this.http.post<Admin>(
      `${this.apiUrl}/Admin`,
      adminCreate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un administrador existente.
   * @param id Identificador único del administrador.
   * @param adminUpdate Objeto con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateAdmin(id: number, adminUpdate: AdminUpdate): Observable<void> {
    const operation = `PUT Update Admin ID: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/Admin/${id}`,
      adminUpdate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un administrador por su ID.
   * @param id Identificador único del administrador a eliminar.
   * @returns Observable vacío.
   */
  deleteAdmin(id: number): Observable<void> {
    const operation = `DELETE Admin ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Admin/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Autentica un administrador usando sus credenciales.
   * @param credentials Objeto con UserID y Password del administrador.
   * @returns Observable con los datos del administrador autenticado.
   */
  authenticateAdmin(credentials: AdminLogin): Observable<Admin> {
    const operation = 'POST Authenticate Admin';
    return this.http.post<Admin>(
      `${this.apiUrl}/Admin/Authenticate`,
      credentials,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para AdminPhone
  // -----------------------------------

  /**
   * Obtiene todos los teléfonos de administradores.
   * @returns Observable con la lista de teléfonos.
   */
  getAdminPhones(): Observable<AdminPhone[]> {
    const operation = 'GET Admin Phones';
    return this.http.get<AdminPhone[]>(`${this.apiUrl}/AdminPhone`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene los teléfonos de un administrador específico.
   * @param adminId ID del administrador.
   * @returns Observable con la lista de teléfonos del administrador.
   */
  getPhonesByAdminId(adminId: number): Observable<AdminPhone[]> {
    const operation = `GET Phones By Admin ID: ${adminId}`;
    return this.http.get<AdminPhone[]>(
      `${this.apiUrl}/AdminPhone/${adminId}/Phones`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo teléfono para un administrador.
   * @param adminPhone Objeto con el ID del admin y el número de teléfono.
   * @returns Observable con el teléfono creado.
   */
  createAdminPhone(adminPhone: AdminPhone): Observable<AdminPhone> {
    const operation = 'POST Create Admin Phone';
    return this.http.post<AdminPhone>(
      `${this.apiUrl}/AdminPhone`,
      adminPhone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un teléfono de administrador existente.
   * @param adminId ID del administrador.
   * @param oldPhone Número de teléfono actual.
   * @param adminPhoneUpdate Nuevo número de teléfono.
   * @returns Observable vacío.
   */
  updateAdminPhone(adminId: number, oldPhone: number, adminPhoneUpdate: AdminPhoneUpdate): Observable<void> {
    const operation = `PUT Update Admin Phone: ${adminId}/${oldPhone}`;
    return this.http.put<void>(
      `${this.apiUrl}/AdminPhone/${adminId}/${oldPhone}`,
      adminPhoneUpdate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un teléfono de administrador.
   * @param adminId ID del administrador.
   * @param phone Número de teléfono a eliminar.
   * @returns Observable vacío.
   */
  deleteAdminPhone(adminId: number, phone: number): Observable<void> {
    const operation = `DELETE Admin Phone: ${adminId}/${phone}`;
    return this.http.delete<void>(
      `${this.apiUrl}/AdminPhone/${adminId}/${phone}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }
}
