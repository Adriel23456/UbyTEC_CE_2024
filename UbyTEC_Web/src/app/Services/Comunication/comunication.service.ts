import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Client, ClientCreate, ClientLogin, ClientUpdate } from '../Client/client.service';
import { Admin, AdminCreate, AdminLogin, AdminPhone, AdminPhoneUpdate, AdminUpdate } from '../Admin/admin.service';
import { FoodDeliveryMan, FoodDeliveryManCreate, FoodDeliveryManLogin, FoodDeliveryManPhone, FoodDeliveryManPhoneUpdate, FoodDeliveryManUpdate } from '../FoodDeliveryMan/food-delivery-man.service';
import { BusinessAssociate, BusinessAssociateCreate, BusinessAssociatePhone, BusinessAssociatePhoneUpdate, BusinessAssociateUpdate } from '../BusinessAssociate/business-associate.service';
import { BusinessType, BusinessTypeCreate, BusinessTypeUpdate } from '../BusinessType/business-type.service';
import { BusinessManager, BusinessManagerAuthResponse, BusinessManagerCreate, BusinessManagerLogin, BusinessManagerPhone, BusinessManagerPhoneUpdate, BusinessManagerUpdate } from '../BusinessManager/business-manager.service';

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

  // -----------------------------------
  // Métodos para FoodDeliveryMan (Identificado por userId)
  // -----------------------------------

  getFoodDeliveryMen(): Observable<FoodDeliveryMan[]> {
    const operation = 'GET FoodDeliveryMen';
    return this.http.get<FoodDeliveryMan[]>(`${this.apiUrl}/FoodDeliveryMan`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getFoodDeliveryManByUserId(userId: string): Observable<FoodDeliveryMan> {
    const operation = `GET FoodDeliveryMan By UserID: ${userId}`;
    return this.http.get<FoodDeliveryMan>(`${this.apiUrl}/FoodDeliveryMan/${userId}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  createFoodDeliveryMan(foodDeliveryMan: FoodDeliveryManCreate): Observable<FoodDeliveryMan> {
    const operation = 'POST Create FoodDeliveryMan';
    return this.http.post<FoodDeliveryMan>(
      `${this.apiUrl}/FoodDeliveryMan`,
      foodDeliveryMan,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryMan(userId: string, update: FoodDeliveryManUpdate): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan ID: ${userId}`;
    return this.http.put<void>(
      `${this.apiUrl}/FoodDeliveryMan/${userId}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryMan(userId: string): Observable<void> {
    const operation = `DELETE FoodDeliveryMan ID: ${userId}`;
    return this.http.delete<void>(
      `${this.apiUrl}/FoodDeliveryMan/${userId}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  authenticateFoodDeliveryMan(credentials: FoodDeliveryManLogin): Observable<FoodDeliveryMan> {
    const operation = 'POST Authenticate FoodDeliveryMan';
    return this.http.post<FoodDeliveryMan>(
      `${this.apiUrl}/FoodDeliveryMan/Authenticate`,
      credentials,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FoodDeliveryManPhone
  // -----------------------------------

  getFoodDeliveryManPhones(): Observable<FoodDeliveryManPhone[]> {
    const operation = 'GET FoodDeliveryMan Phones';
    return this.http.get<FoodDeliveryManPhone[]>(
      `${this.apiUrl}/FoodDeliveryManPhone`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  getPhonesByFoodDeliveryManUserId(userId: string): Observable<FoodDeliveryManPhone[]> {
    const operation = `GET Phones By FoodDeliveryMan UserID: ${userId}`;
    return this.http.get<FoodDeliveryManPhone[]>(
      `${this.apiUrl}/FoodDeliveryManPhone/${userId}/Phones`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  createFoodDeliveryManPhone(phone: FoodDeliveryManPhone): Observable<FoodDeliveryManPhone> {
    const operation = 'POST Create FoodDeliveryMan Phone';
    return this.http.post<FoodDeliveryManPhone>(
      `${this.apiUrl}/FoodDeliveryManPhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryManPhone(
    userId: string,
    oldPhone: number,
    update: FoodDeliveryManPhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan Phone: ${userId}/${oldPhone}`;
    return this.http.put<void>(
      `${this.apiUrl}/FoodDeliveryManPhone/${userId}/${oldPhone}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryManPhone(userId: string, phone: number): Observable<void> {
    const operation = `DELETE FoodDeliveryMan Phone: ${userId}/${phone}`;
    return this.http.delete<void>(
      `${this.apiUrl}/FoodDeliveryManPhone/${userId}/${phone}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociate (Identificado por legal_id)
  // -----------------------------------

  getBusinessAssociates(): Observable<BusinessAssociate[]> {
    const operation = 'GET BusinessAssociates';
    return this.http.get<BusinessAssociate[]>(`${this.apiUrl}/BusinessAssociate`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getBusinessAssociateByLegalId(legalId: number): Observable<BusinessAssociate> {
    const operation = `GET BusinessAssociate By Legal ID: ${legalId}`;
    return this.http.get<BusinessAssociate>(
      `${this.apiUrl}/BusinessAssociate/${legalId}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  createBusinessAssociate(businessAssociate: BusinessAssociateCreate): Observable<BusinessAssociate> {
    const operation = 'POST Create BusinessAssociate';
    return this.http.post<BusinessAssociate>(
      `${this.apiUrl}/BusinessAssociate`,
      businessAssociate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociate(legalId: number, update: BusinessAssociateUpdate): Observable<void> {
    const operation = `PUT Update BusinessAssociate ID: ${legalId}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessAssociate/${legalId}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociate(legalId: number): Observable<void> {
    const operation = `DELETE BusinessAssociate ID: ${legalId}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessAssociate/${legalId}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociatePhone
  // -----------------------------------

  getBusinessAssociatePhones(): Observable<BusinessAssociatePhone[]> {
    const operation = 'GET BusinessAssociate Phones';
    return this.http.get<BusinessAssociatePhone[]>(
      `${this.apiUrl}/BusinessAssociatePhone`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  getPhonesByBusinessAssociateLegalId(legalId: number): Observable<BusinessAssociatePhone[]> {
    const operation = `GET Phones By BusinessAssociate Legal ID: ${legalId}`;
    return this.http.get<BusinessAssociatePhone[]>(
      `${this.apiUrl}/BusinessAssociatePhone/${legalId}/Phones`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  createBusinessAssociatePhone(phone: BusinessAssociatePhone): Observable<BusinessAssociatePhone> {
    const operation = 'POST Create BusinessAssociate Phone';
    return this.http.post<BusinessAssociatePhone>(
      `${this.apiUrl}/BusinessAssociatePhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociatePhone(
    legalId: number,
    oldPhone: number,
    update: BusinessAssociatePhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessAssociate Phone: ${legalId}/${oldPhone}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessAssociatePhone/${legalId}/${oldPhone}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociatePhone(legalId: number, phone: number): Observable<void> {
    const operation = `DELETE BusinessAssociate Phone: ${legalId}/${phone}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessAssociatePhone/${legalId}/${phone}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessType (Identificado por Identification)
  // -----------------------------------

  /**
   * Obtiene todos los tipos de negocio.
   * @returns Observable con la lista de tipos de negocio.
   */
  getBusinessTypes(): Observable<BusinessType[]> {
    const operation = 'GET BusinessTypes';
    return this.http.get<BusinessType[]>(
      `${this.apiUrl}/BusinessType`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un tipo de negocio específico por su ID.
   * @param id Identificador único del tipo de negocio.
   * @returns Observable con el tipo de negocio solicitado.
   */
  getBusinessTypeById(id: number): Observable<BusinessType> {
    const operation = `GET BusinessType By ID: ${id}`;
    return this.http.get<BusinessType>(
      `${this.apiUrl}/BusinessType/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo tipo de negocio.
   * @param businessType Objeto de tipo BusinessTypeCreate para crear el tipo de negocio.
   * @returns Observable con el tipo de negocio creado.
   */
  createBusinessType(businessType: BusinessTypeCreate): Observable<BusinessType> {
    const operation = 'POST Create BusinessType';
    return this.http.post<BusinessType>(
      `${this.apiUrl}/BusinessType`,
      businessType,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un tipo de negocio existente.
   * @param id Identificador único del tipo de negocio.
   * @param businessType Objeto con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateBusinessType(id: number, businessType: BusinessTypeUpdate): Observable<void> {
    const operation = `PUT Update BusinessType ID: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessType/${id}`,
      businessType,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un tipo de negocio por su ID.
   * @param id Identificador único del tipo de negocio a eliminar.
   * @returns Observable vacío.
   */
  deleteBusinessType(id: number): Observable<void> {
    const operation = `DELETE BusinessType ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessType/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessManager (Identificado por email)
  // -----------------------------------

  getBusinessManagers(): Observable<BusinessManager[]> {
    const operation = 'GET BusinessManagers';
    return this.http.get<BusinessManager[]>(`${this.apiUrl}/BusinessManager`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getBusinessManagerByEmail(email: string): Observable<BusinessManager> {
    const operation = `GET BusinessManager By Email: ${email}`;
    return this.http.get<BusinessManager>(
      `${this.apiUrl}/BusinessManager/${email}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  createBusinessManager(businessManager: BusinessManagerCreate): Observable<BusinessManager> {
    const operation = 'POST Create BusinessManager';
    return this.http.post<BusinessManager>(
      `${this.apiUrl}/BusinessManager`,
      businessManager,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManager(email: string, businessManager: BusinessManagerUpdate): Observable<void> {
    const operation = `PUT Update BusinessManager Email: ${email}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessManager/${email}`,
      businessManager,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManager(email: string): Observable<void> {
    const operation = `DELETE BusinessManager Email: ${email}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessManager/${email}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  authenticateBusinessManager(credentials: BusinessManagerLogin): Observable<BusinessManagerAuthResponse> {
    const operation = 'POST Authenticate BusinessManager';
    return this.http.post<BusinessManagerAuthResponse>(
      `${this.apiUrl}/BusinessManager/Authenticate`,
      credentials,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessManagerPhone
  // -----------------------------------

  getBusinessManagerPhones(): Observable<BusinessManagerPhone[]> {
    const operation = 'GET BusinessManager Phones';
    return this.http.get<BusinessManagerPhone[]>(
      `${this.apiUrl}/BusinessManagerPhone`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  getPhonesByBusinessManagerEmail(email: string): Observable<BusinessManagerPhone[]> {
    const operation = `GET Phones By BusinessManager Email: ${email}`;
    return this.http.get<BusinessManagerPhone[]>(
      `${this.apiUrl}/BusinessManagerPhone/${email}/Phones`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  createBusinessManagerPhone(phone: BusinessManagerPhone): Observable<BusinessManagerPhone> {
    const operation = 'POST Create BusinessManager Phone';
    return this.http.post<BusinessManagerPhone>(
      `${this.apiUrl}/BusinessManagerPhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManagerPhone(
    email: string,
    oldPhone: number,
    update: BusinessManagerPhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessManager Phone: ${email}/${oldPhone}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessManagerPhone/${email}/${oldPhone}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManagerPhone(email: string, phone: number): Observable<void> {
    const operation = `DELETE BusinessManager Phone: ${email}/${phone}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessManagerPhone/${email}/${phone}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }
}
