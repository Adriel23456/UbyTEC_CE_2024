import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  Client,
  ClientCreate,
  ClientLogin,
  ClientUpdate,
} from '../Client/client.service';
import {
  Admin,
  AdminCreate,
  AdminLogin,
  AdminPhone,
  AdminPhoneUpdate,
  AdminUpdate,
} from '../Admin/admin.service';
import {
  FoodDeliveryMan,
  FoodDeliveryManCreate,
  FoodDeliveryManLogin,
  FoodDeliveryManPhone,
  FoodDeliveryManPhoneUpdate,
  FoodDeliveryManUpdate,
} from '../FoodDeliveryMan/food-delivery-man.service';
import {
  BusinessAssociate,
  BusinessAssociateCreate,
  BusinessAssociatePhone,
  BusinessAssociatePhoneUpdate,
  BusinessAssociateUpdate,
} from '../BusinessAssociate/business-associate.service';
import {
  BusinessType,
  BusinessTypeCreate,
  BusinessTypeUpdate,
} from '../BusinessType/business-type.service';
import {
  BusinessManager,
  BusinessManagerAuthResponse,
  BusinessManagerCreate,
  BusinessManagerLogin,
  BusinessManagerPhone,
  BusinessManagerPhoneUpdate,
  BusinessManagerUpdate,
} from '../BusinessManager/business-manager.service';
import {
  Product,
  ProductCreate,
  ProductPhoto,
  ProductPhotoUpdate,
  ProductUpdate,
} from '../Product/product.service';
import {
  Cart,
  CartCreate,
  CartProduct,
  CartProductCreate,
  CartProductUpdate,
  CartUpdate,
} from '../Cart/cart.service';
import {
  Order,
  OrderCreate,
  OrderProduct,
  OrderProductCreate,
  OrderProductUpdate,
  OrderUpdate,
} from '../Order/order.service';
import {
  ProofOfPayment,
  ProofOfPaymentCreate,
  ProofOfPaymentUpdate,
} from '../ProofOfPayment/proof-of-payment.service';
import {
  FeedBack,
  FeedBackCreate,
  FeedBackUpdate,
} from '../FeedBack/feed-back.service';
import {
  ConsolidatedSalesReport,
  SalesReportByAffiliate,
  TopSellingProducts,
} from '../Principal/principal.service';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  private apiUrl =
    'https://ubytec-api-dkfpfjghc9fdfzad.canadacentral-01.azurewebsites.net/api';
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
        console.error(
          `${operation} - Código de estado: ${error.status}, ` +
            `Error: ${error.error.message || error.message}`
        );
      }
      // Retorna un observable con un mensaje de error amigable
      return throwError(
        () =>
          new Error(
            `${operation} falló: ${error.error.message || error.message}`
          )
      );
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
    return this.http
      .get<Client[]>(`${this.apiUrl}/Client`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un cliente específico por su Id.
   * @param id Identificador único del cliente.
   * @returns Observable con el cliente solicitado.
   */
  getClientById(id: number): Observable<Client> {
    const operation = `GET User By ID: ${id}`;
    return this.http
      .get<Client>(`${this.apiUrl}/Client/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo cliente.
   * @param clientCreate Objeto de tipo ClientCreate para crear el cliente.
   * @returns Observable con el cliente creado.
   */
  createClient(clientCreate: ClientCreate): Observable<Client> {
    const operation = 'POST Create Client';
    return this.http
      .post<Client>(`${this.apiUrl}/Client`, clientCreate, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un cliente existente.
   * @param id Identificador único del cliente.
   * @param clientUpdate Objeto de tipo ClientUpdate con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateClient(id: number, clientUpdate: ClientUpdate): Observable<void> {
    const operation = `PUT Update Client ID: ${id}`;
    return this.http
      .put<void>(`${this.apiUrl}/Client/${id}`, clientUpdate, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un cliente por su ID.
   * @param id Identificador único del cliente a eliminar.
   * @returns Observable vacío que completa cuando la eliminación es exitosa.
   */
  deleteClient(id: number): Observable<void> {
    const operation = `DELETE Client ID: ${id}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Client/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Autentica un cliente usando sus credenciales.
   * @param credentials Objeto con UserId y Password del cliente.
   * @returns Observable con los datos del cliente autenticado.
   */
  authenticateClient(credentials: ClientLogin): Observable<Client> {
    const operation = 'POST Authenticate Client';
    return this.http
      .post<Client>(`${this.apiUrl}/Client/Authenticate`, credentials, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
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
    return this.http
      .get<Admin[]>(`${this.apiUrl}/Admin`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un administrador específico por su Id.
   * @param id Identificador único del administrador.
   * @returns Observable con el administrador solicitado.
   */
  getAdminById(id: number): Observable<Admin> {
    const operation = `GET Admin By ID: ${id}`;
    return this.http
      .get<Admin>(`${this.apiUrl}/Admin/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo administrador.
   * @param adminCreate Objeto de tipo AdminCreate para crear el administrador.
   * @returns Observable con el administrador creado.
   */
  createAdmin(adminCreate: AdminCreate): Observable<Admin> {
    const operation = 'POST Create Admin';
    return this.http
      .post<Admin>(`${this.apiUrl}/Admin`, adminCreate, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un administrador existente.
   * @param id Identificador único del administrador.
   * @param adminUpdate Objeto con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateAdmin(id: number, adminUpdate: AdminUpdate): Observable<void> {
    const operation = `PUT Update Admin ID: ${id}`;
    return this.http
      .put<void>(`${this.apiUrl}/Admin/${id}`, adminUpdate, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un administrador por su ID.
   * @param id Identificador único del administrador a eliminar.
   * @returns Observable vacío.
   */
  deleteAdmin(id: number): Observable<void> {
    const operation = `DELETE Admin ID: ${id}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Admin/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Autentica un administrador usando sus credenciales.
   * @param credentials Objeto con UserID y Password del administrador.
   * @returns Observable con los datos del administrador autenticado.
   */
  authenticateAdmin(credentials: AdminLogin): Observable<Admin> {
    const operation = 'POST Authenticate Admin';
    return this.http
      .post<Admin>(`${this.apiUrl}/Admin/Authenticate`, credentials, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
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
    return this.http
      .get<AdminPhone[]>(`${this.apiUrl}/AdminPhone`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene los teléfonos de un administrador específico.
   * @param adminId ID del administrador.
   * @returns Observable con la lista de teléfonos del administrador.
   */
  getPhonesByAdminId(adminId: number): Observable<AdminPhone[]> {
    const operation = `GET Phones By Admin ID: ${adminId}`;
    return this.http
      .get<AdminPhone[]>(`${this.apiUrl}/AdminPhone/${adminId}/Phones`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo teléfono para un administrador.
   * @param adminPhone Objeto con el ID del admin y el número de teléfono.
   * @returns Observable con el teléfono creado.
   */
  createAdminPhone(adminPhone: AdminPhone): Observable<AdminPhone> {
    const operation = 'POST Create Admin Phone';
    return this.http
      .post<AdminPhone>(`${this.apiUrl}/AdminPhone`, adminPhone, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un teléfono de administrador existente.
   * @param adminId ID del administrador.
   * @param oldPhone Número de teléfono actual.
   * @param adminPhoneUpdate Nuevo número de teléfono.
   * @returns Observable vacío.
   */
  updateAdminPhone(
    adminId: number,
    oldPhone: number,
    adminPhoneUpdate: AdminPhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update Admin Phone: ${adminId}/${oldPhone}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/AdminPhone/${adminId}/${oldPhone}`,
        adminPhoneUpdate,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un teléfono de administrador.
   * @param adminId ID del administrador.
   * @param phone Número de teléfono a eliminar.
   * @returns Observable vacío.
   */
  deleteAdminPhone(adminId: number, phone: number): Observable<void> {
    const operation = `DELETE Admin Phone: ${adminId}/${phone}`;
    return this.http
      .delete<void>(`${this.apiUrl}/AdminPhone/${adminId}/${phone}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FoodDeliveryMan (Identificado por userId)
  // -----------------------------------

  getFoodDeliveryMen(): Observable<FoodDeliveryMan[]> {
    const operation = 'GET FoodDeliveryMen';
    return this.http
      .get<FoodDeliveryMan[]>(`${this.apiUrl}/FoodDeliveryMan`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getFoodDeliveryManByUserId(userId: string): Observable<FoodDeliveryMan> {
    const operation = `GET FoodDeliveryMan By UserID: ${userId}`;
    return this.http
      .get<FoodDeliveryMan>(`${this.apiUrl}/FoodDeliveryMan/${userId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  createFoodDeliveryMan(
    foodDeliveryMan: FoodDeliveryManCreate
  ): Observable<FoodDeliveryMan> {
    const operation = 'POST Create FoodDeliveryMan';
    return this.http
      .post<FoodDeliveryMan>(
        `${this.apiUrl}/FoodDeliveryMan`,
        foodDeliveryMan,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryMan(
    userId: string,
    update: FoodDeliveryManUpdate
  ): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan ID: ${userId}`;
    return this.http
      .put<void>(`${this.apiUrl}/FoodDeliveryMan/${userId}`, update, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryMan(userId: string): Observable<void> {
    const operation = `DELETE FoodDeliveryMan ID: ${userId}`;
    return this.http
      .delete<void>(`${this.apiUrl}/FoodDeliveryMan/${userId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  authenticateFoodDeliveryMan(
    credentials: FoodDeliveryManLogin
  ): Observable<FoodDeliveryMan> {
    const operation = 'POST Authenticate FoodDeliveryMan';
    return this.http
      .post<FoodDeliveryMan>(
        `${this.apiUrl}/FoodDeliveryMan/Authenticate`,
        credentials,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FoodDeliveryManPhone
  // -----------------------------------

  getFoodDeliveryManPhones(): Observable<FoodDeliveryManPhone[]> {
    const operation = 'GET FoodDeliveryMan Phones';
    return this.http
      .get<FoodDeliveryManPhone[]>(`${this.apiUrl}/FoodDeliveryManPhone`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getPhonesByFoodDeliveryManUserId(
    userId: string
  ): Observable<FoodDeliveryManPhone[]> {
    const operation = `GET Phones By FoodDeliveryMan UserID: ${userId}`;
    return this.http
      .get<FoodDeliveryManPhone[]>(
        `${this.apiUrl}/FoodDeliveryManPhone/${userId}/Phones`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  createFoodDeliveryManPhone(
    phone: FoodDeliveryManPhone
  ): Observable<FoodDeliveryManPhone> {
    const operation = 'POST Create FoodDeliveryMan Phone';
    return this.http
      .post<FoodDeliveryManPhone>(
        `${this.apiUrl}/FoodDeliveryManPhone`,
        phone,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryManPhone(
    userId: string,
    oldPhone: number,
    update: FoodDeliveryManPhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan Phone: ${userId}/${oldPhone}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/FoodDeliveryManPhone/${userId}/${oldPhone}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryManPhone(userId: string, phone: number): Observable<void> {
    const operation = `DELETE FoodDeliveryMan Phone: ${userId}/${phone}`;
    return this.http
      .delete<void>(`${this.apiUrl}/FoodDeliveryManPhone/${userId}/${phone}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociate (Identificado por legal_id)
  // -----------------------------------

  getBusinessAssociates(): Observable<BusinessAssociate[]> {
    const operation = 'GET BusinessAssociates';
    return this.http
      .get<BusinessAssociate[]>(`${this.apiUrl}/BusinessAssociate`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getBusinessAssociateByLegalId(
    legalId: number
  ): Observable<BusinessAssociate> {
    const operation = `GET BusinessAssociate By Legal ID: ${legalId}`;
    return this.http
      .get<BusinessAssociate>(`${this.apiUrl}/BusinessAssociate/${legalId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  createBusinessAssociate(
    businessAssociate: BusinessAssociateCreate
  ): Observable<BusinessAssociate> {
    const operation = 'POST Create BusinessAssociate';
    return this.http
      .post<BusinessAssociate>(
        `${this.apiUrl}/BusinessAssociate`,
        businessAssociate,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociate(
    legalId: number,
    update: BusinessAssociateUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessAssociate ID: ${legalId}`;
    return this.http
      .put<void>(`${this.apiUrl}/BusinessAssociate/${legalId}`, update, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociate(legalId: number): Observable<void> {
    const operation = `DELETE BusinessAssociate ID: ${legalId}`;
    return this.http
      .delete<void>(`${this.apiUrl}/BusinessAssociate/${legalId}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociatePhone
  // -----------------------------------

  getBusinessAssociatePhones(): Observable<BusinessAssociatePhone[]> {
    const operation = 'GET BusinessAssociate Phones';
    return this.http
      .get<BusinessAssociatePhone[]>(`${this.apiUrl}/BusinessAssociatePhone`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getPhonesByBusinessAssociateLegalId(
    legalId: number
  ): Observable<BusinessAssociatePhone[]> {
    const operation = `GET Phones By BusinessAssociate Legal ID: ${legalId}`;
    return this.http
      .get<BusinessAssociatePhone[]>(
        `${this.apiUrl}/BusinessAssociatePhone/${legalId}/Phones`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  createBusinessAssociatePhone(
    phone: BusinessAssociatePhone
  ): Observable<BusinessAssociatePhone> {
    const operation = 'POST Create BusinessAssociate Phone';
    return this.http
      .post<BusinessAssociatePhone>(
        `${this.apiUrl}/BusinessAssociatePhone`,
        phone,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociatePhone(
    legalId: number,
    oldPhone: number,
    update: BusinessAssociatePhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessAssociate Phone: ${legalId}/${oldPhone}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/BusinessAssociatePhone/${legalId}/${oldPhone}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociatePhone(
    legalId: number,
    phone: number
  ): Observable<void> {
    const operation = `DELETE BusinessAssociate Phone: ${legalId}/${phone}`;
    return this.http
      .delete<void>(
        `${this.apiUrl}/BusinessAssociatePhone/${legalId}/${phone}`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
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
    return this.http
      .get<BusinessType[]>(`${this.apiUrl}/BusinessType`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene un tipo de negocio específico por su ID.
   * @param id Identificador único del tipo de negocio.
   * @returns Observable con el tipo de negocio solicitado.
   */
  getBusinessTypeById(id: number): Observable<BusinessType> {
    const operation = `GET BusinessType By ID: ${id}`;
    return this.http
      .get<BusinessType>(`${this.apiUrl}/BusinessType/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Crea un nuevo tipo de negocio.
   * @param businessType Objeto de tipo BusinessTypeCreate para crear el tipo de negocio.
   * @returns Observable con el tipo de negocio creado.
   */
  createBusinessType(
    businessType: BusinessTypeCreate
  ): Observable<BusinessType> {
    const operation = 'POST Create BusinessType';
    return this.http
      .post<BusinessType>(`${this.apiUrl}/BusinessType`, businessType, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un tipo de negocio existente.
   * @param id Identificador único del tipo de negocio.
   * @param businessType Objeto con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateBusinessType(
    id: number,
    businessType: BusinessTypeUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessType ID: ${id}`;
    return this.http
      .put<void>(`${this.apiUrl}/BusinessType/${id}`, businessType, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   *
   * Elimina un tipo de negocio por su ID.
   * @param id Identificador único del tipo de negocio a eliminar.
   * @returns Observable vacío.
   */
  deleteBusinessType(id: number): Observable<void> {
    const operation = `DELETE BusinessType ID: ${id}`;
    return this.http
      .delete<void>(`${this.apiUrl}/BusinessType/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessManager (Identificado por email)
  // -----------------------------------

  getBusinessManagers(): Observable<BusinessManager[]> {
    const operation = 'GET BusinessManagers';
    return this.http
      .get<BusinessManager[]>(`${this.apiUrl}/BusinessManager`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getBusinessManagerByEmail(email: string): Observable<BusinessManager> {
    const operation = `GET BusinessManager By Email: ${email}`;
    return this.http
      .get<BusinessManager>(`${this.apiUrl}/BusinessManager/${email}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  createBusinessManager(
    businessManager: BusinessManagerCreate
  ): Observable<BusinessManager> {
    const operation = 'POST Create BusinessManager';
    return this.http
      .post<BusinessManager>(
        `${this.apiUrl}/BusinessManager`,
        businessManager,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManager(
    email: string,
    businessManager: BusinessManagerUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessManager Email: ${email}`;
    return this.http
      .put<void>(`${this.apiUrl}/BusinessManager/${email}`, businessManager, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManager(email: string): Observable<void> {
    const operation = `DELETE BusinessManager Email: ${email}`;
    return this.http
      .delete<void>(`${this.apiUrl}/BusinessManager/${email}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  authenticateBusinessManager(
    credentials: BusinessManagerLogin
  ): Observable<BusinessManagerAuthResponse> {
    const operation = 'POST Authenticate BusinessManager';
    return this.http
      .post<BusinessManagerAuthResponse>(
        `${this.apiUrl}/BusinessManager/Authenticate`,
        credentials,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessManagerPhone
  // -----------------------------------

  getBusinessManagerPhones(): Observable<BusinessManagerPhone[]> {
    const operation = 'GET BusinessManager Phones';
    return this.http
      .get<BusinessManagerPhone[]>(`${this.apiUrl}/BusinessManagerPhone`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getPhonesByBusinessManagerEmail(
    email: string
  ): Observable<BusinessManagerPhone[]> {
    const operation = `GET Phones By BusinessManager Email: ${email}`;
    return this.http
      .get<BusinessManagerPhone[]>(
        `${this.apiUrl}/BusinessManagerPhone/${email}/Phones`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  createBusinessManagerPhone(
    phone: BusinessManagerPhone
  ): Observable<BusinessManagerPhone> {
    const operation = 'POST Create BusinessManager Phone';
    return this.http
      .post<BusinessManagerPhone>(
        `${this.apiUrl}/BusinessManagerPhone`,
        phone,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManagerPhone(
    email: string,
    oldPhone: number,
    update: BusinessManagerPhoneUpdate
  ): Observable<void> {
    const operation = `PUT Update BusinessManager Phone: ${email}/${oldPhone}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/BusinessManagerPhone/${email}/${oldPhone}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManagerPhone(email: string, phone: number): Observable<void> {
    const operation = `DELETE BusinessManager Phone: ${email}/${phone}`;
    return this.http
      .delete<void>(`${this.apiUrl}/BusinessManagerPhone/${email}/${phone}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Product (Identificado por code)
  // -----------------------------------

  getProducts(): Observable<Product[]> {
    const operation = 'GET Products';
    return this.http
      .get<Product[]>(`${this.apiUrl}/Product`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getProductByCode(code: number): Observable<Product> {
    const operation = `GET Product By Code: ${code}`;
    return this.http
      .get<Product>(`${this.apiUrl}/Product/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  createProduct(product: ProductCreate): Observable<Product> {
    const operation = 'POST Create Product';
    return this.http
      .post<Product>(`${this.apiUrl}/Product`, product, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateProduct(code: number, product: ProductUpdate): Observable<void> {
    const operation = `PUT Update Product Code: ${code}`;
    return this.http
      .put<void>(`${this.apiUrl}/Product/${code}`, product, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteProduct(code: number): Observable<void> {
    const operation = `DELETE Product Code: ${code}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Product/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para ProductPhoto
  // -----------------------------------

  getProductPhotos(): Observable<ProductPhoto[]> {
    const operation = 'GET Product Photos';
    return this.http
      .get<ProductPhoto[]>(`${this.apiUrl}/ProductPhoto`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getPhotosByProductCode(productCode: number): Observable<ProductPhoto[]> {
    const operation = `GET Photos By Product Code: ${productCode}`;
    return this.http
      .get<ProductPhoto[]>(
        `${this.apiUrl}/ProductPhoto/${productCode}/Photos`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  createProductPhoto(photo: ProductPhoto): Observable<ProductPhoto> {
    const operation = 'POST Create Product Photo';
    return this.http
      .post<ProductPhoto>(`${this.apiUrl}/ProductPhoto`, photo, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateProductPhoto(
    productCode: number,
    oldPhotoUrl: string,
    update: ProductPhotoUpdate
  ): Observable<void> {
    const operation = `PUT Update Product Photo: ${productCode}/${oldPhotoUrl}`;
    const encodedPhotoUrl = encodeURIComponent(oldPhotoUrl);

    return this.http
      .put<void>(
        `${this.apiUrl}/ProductPhoto/${productCode}/${encodedPhotoUrl}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteProductPhoto(productCode: number, photoUrl: string): Observable<void> {
    const operation = `DELETE Product Photo: ${productCode}/${photoUrl}`;
    const encodedPhotoUrl = encodeURIComponent(photoUrl);

    return this.http
      .delete<void>(
        `${this.apiUrl}/ProductPhoto/${productCode}/${encodedPhotoUrl}`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Cart (Identificado por code)
  // -----------------------------------

  getCarts(): Observable<Cart[]> {
    const operation = 'GET Carts';
    return this.http
      .get<Cart[]>(`${this.apiUrl}/Cart`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getCartByCode(code: number): Observable<Cart> {
    const operation = `GET Cart By Code: ${code}`;
    return this.http
      .get<Cart>(`${this.apiUrl}/Cart/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  createCart(cart: CartCreate): Observable<Cart> {
    const operation = 'POST Create Cart';
    return this.http
      .post<Cart>(`${this.apiUrl}/Cart`, cart, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  updateCart(code: number, cart: CartUpdate): Observable<void> {
    const operation = `PUT Update Cart Code: ${code}`;
    return this.http
      .put<void>(`${this.apiUrl}/Cart/${code}`, cart, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteCart(code: number): Observable<void> {
    const operation = `DELETE Cart Code: ${code}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Cart/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Cart_Product
  // -----------------------------------

  getCartProducts(): Observable<CartProduct[]> {
    const operation = 'GET Cart Products';
    return this.http
      .get<CartProduct[]>(`${this.apiUrl}/Cart_Product`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getProductsByCartCode(cartCode: number): Observable<CartProduct[]> {
    const operation = `GET Products By Cart Code: ${cartCode}`;
    return this.http
      .get<CartProduct[]>(`${this.apiUrl}/Cart_Product/${cartCode}/Products`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  createCartProduct(cartProduct: CartProductCreate): Observable<CartProduct> {
    const operation = 'POST Create Cart Product';
    return this.http
      .post<CartProduct>(`${this.apiUrl}/Cart_Product`, cartProduct, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateCartProduct(
    cartCode: number,
    productCode: number,
    update: CartProductUpdate
  ): Observable<void> {
    const operation = `PUT Update Cart Product: ${cartCode}/${productCode}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/Cart_Product/${cartCode}/${productCode}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteCartProduct(cartCode: number, productCode: number): Observable<void> {
    const operation = `DELETE Cart Product: ${cartCode}/${productCode}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Cart_Product/${cartCode}/${productCode}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Order (Identificado por code)
  // -----------------------------------

  getOrders(): Observable<Order[]> {
    const operation = 'GET Orders';
    return this.http
      .get<Order[]>(`${this.apiUrl}/Order`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getOrderByCode(code: number): Observable<Order> {
    const operation = `GET Order By Code: ${code}`;
    return this.http
      .get<Order>(`${this.apiUrl}/Order/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  createOrder(order: OrderCreate): Observable<Order> {
    const operation = 'POST Create Order';
    return this.http
      .post<Order>(`${this.apiUrl}/Order`, order, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  updateOrder(code: number, order: OrderUpdate): Observable<void> {
    const operation = `PUT Update Order Code: ${code}`;
    return this.http
      .put<void>(`${this.apiUrl}/Order/${code}`, order, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteOrder(code: number): Observable<void> {
    const operation = `DELETE Order Code: ${code}`;
    return this.http
      .delete<void>(`${this.apiUrl}/Order/${code}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Order_Product
  // -----------------------------------

  getOrderProducts(): Observable<OrderProduct[]> {
    const operation = 'GET Order Products';
    return this.http
      .get<OrderProduct[]>(`${this.apiUrl}/Order_Product`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getProductsByOrderCode(orderCode: number): Observable<OrderProduct[]> {
    const operation = `GET Products By Order Code: ${orderCode}`;
    return this.http
      .get<OrderProduct[]>(
        `${this.apiUrl}/Order_Product/${orderCode}/Products`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  createOrderProduct(
    orderProduct: OrderProductCreate
  ): Observable<OrderProduct> {
    const operation = 'POST Create Order Product';
    return this.http
      .post<OrderProduct>(`${this.apiUrl}/Order_Product`, orderProduct, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateOrderProduct(
    orderCode: number,
    productCode: number,
    update: OrderProductUpdate
  ): Observable<void> {
    const operation = `PUT Update Order Product: ${orderCode}/${productCode}`;
    return this.http
      .put<void>(
        `${this.apiUrl}/Order_Product/${orderCode}/${productCode}`,
        update,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  deleteOrderProduct(orderCode: number, productCode: number): Observable<void> {
    const operation = `DELETE Order Product: ${orderCode}/${productCode}`;
    return this.http
      .delete<void>(
        `${this.apiUrl}/Order_Product/${orderCode}/${productCode}`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para ProofOfPayment (Identificado por code)
  // -----------------------------------

  getProofOfPayments(): Observable<ProofOfPayment[]> {
    const operation = 'GET ProofOfPayments';
    return this.http
      .get<ProofOfPayment[]>(`${this.apiUrl}/ProofOfPayment`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  getProofOfPaymentByCode(code: number): Observable<ProofOfPayment> {
    const operation = `GET ProofOfPayment By Code: ${code}`;
    return this.http
      .get<ProofOfPayment>(`${this.apiUrl}/ProofOfPayment/${code}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  createProofOfPayment(
    proofOfPayment: ProofOfPaymentCreate
  ): Observable<ProofOfPayment> {
    const operation = 'POST Create ProofOfPayment';
    return this.http
      .post<ProofOfPayment>(`${this.apiUrl}/ProofOfPayment`, proofOfPayment, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateProofOfPayment(
    code: number,
    proofOfPayment: ProofOfPaymentUpdate
  ): Observable<void> {
    const operation = `PUT Update ProofOfPayment Code: ${code}`;
    return this.http
      .put<void>(`${this.apiUrl}/ProofOfPayment/${code}`, proofOfPayment, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteProofOfPayment(code: number): Observable<void> {
    const operation = `DELETE ProofOfPayment Code: ${code}`;
    return this.http
      .delete<void>(`${this.apiUrl}/ProofOfPayment/${code}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FeedBack (Identificado por id)
  // -----------------------------------

  getFeedBacks(): Observable<FeedBack[]> {
    const operation = 'GET FeedBacks';
    return this.http
      .get<FeedBack[]>(`${this.apiUrl}/FeedBack`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  getFeedBackById(id: number): Observable<FeedBack> {
    const operation = `GET FeedBack By Id: ${id}`;
    return this.http
      .get<FeedBack>(`${this.apiUrl}/FeedBack/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  createFeedBack(feedBack: FeedBackCreate): Observable<FeedBack> {
    const operation = 'POST Create FeedBack';
    return this.http
      .post<FeedBack>(`${this.apiUrl}/FeedBack`, feedBack, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  updateFeedBack(id: number, feedBack: FeedBackUpdate): Observable<void> {
    const operation = `PUT Update FeedBack Id: ${id}`;
    return this.http
      .put<void>(`${this.apiUrl}/FeedBack/${id}`, feedBack, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  deleteFeedBack(id: number): Observable<void> {
    const operation = `DELETE FeedBack Id: ${id}`;
    return this.http
      .delete<void>(`${this.apiUrl}/FeedBack/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Principal (Reportes y funciones especiales)
  // -----------------------------------

  getConsolidatedSalesReport(): Observable<ConsolidatedSalesReport[]> {
    const operation = 'GET Consolidated Sales Report';
    return this.http
      .get<ConsolidatedSalesReport[]>(
        `${this.apiUrl}/Principal/GetConsolidatedSalesReport`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  getSalesReportByAffiliate(): Observable<SalesReportByAffiliate[]> {
    const operation = 'GET Sales Report By Affiliate';
    return this.http
      .get<SalesReportByAffiliate[]>(
        `${this.apiUrl}/Principal/GetSalesReportByAffiliate`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  getTopSellingProducts(): Observable<TopSellingProducts[]> {
    const operation = 'GET Top Selling Products';
    return this.http
      .get<TopSellingProducts[]>(
        `${this.apiUrl}/Principal/GetTopSellingProducts`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  assignOrderToDeliveryMan(orderCode: number): Observable<void> {
    const operation = `POST Assign Order ${orderCode} To DeliveryMan`;
    return this.http
      .post<void>(
        `${this.apiUrl}/Principal/AssignOrderToDeliveryMan/${orderCode}`,
        {},
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  receiveOrderByClient(orderCode: number): Observable<void> {
    const operation = `POST Receive Order ${orderCode} By Client`;
    return this.http
      .post<void>(
        `${this.apiUrl}/Principal/ReceiveOrderByClient/${orderCode}`,
        {},
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  getBusinessesByFilterAndClientLocation(
    clientId: number,
    filter?: string
  ): Observable<BusinessAssociate[]> {
    const operation = 'GET Businesses By Filter And Client Location';
    const params = new HttpParams()
      .set('clientId', clientId.toString())
      .set('filter', filter || '');

    return this.http
      .get<BusinessAssociate[]>(
        `${this.apiUrl}/Principal/GetBusinessesByFilterAndClientLocation`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para ExtrasController
  // -----------------------------------

  /**
   * Obtiene administradores filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de AdminDTO filtrados.
   */
  public getAdminsByFilter(filter: string): Observable<Admin[]> {
    const operation = 'GET Admins By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<Admin[]>(`${this.apiUrl}/Extras/GetAdminsByFilter`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene business associates filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessAssociateDTO filtrados.
   */
  public getBusinessAssociatesByFilter(
    filter: string
  ): Observable<BusinessAssociate[]> {
    const operation = 'GET BusinessAssociates By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<BusinessAssociate[]>(
        `${this.apiUrl}/Extras/GetBusinessAssociatesByFilter`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene business managers filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessManagerDTO filtrados.
   */
  public getBusinessManagersByFilter(
    filter: string
  ): Observable<BusinessManager[]> {
    const operation = 'GET BusinessManagers By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<BusinessManager[]>(
        `${this.apiUrl}/Extras/GetBusinessManagersByFilter`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene business associates aceptados filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessAssociateDTO aceptados filtrados.
   */
  public getAcceptedBusinessAssociatesByFilter(
    filter: string
  ): Observable<BusinessAssociate[]> {
    const operation = 'GET Accepted BusinessAssociates By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<BusinessAssociate[]>(
        `${this.apiUrl}/Extras/GetAcceptedBusinessAssociatesByFilter`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene clientes filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de ClientDTO filtrados.
   */
  public getClientsByFilter(filter: string): Observable<Client[]> {
    const operation = 'GET Clients By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<Client[]>(`${this.apiUrl}/Extras/GetClientsByFilter`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene food delivery men filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de FoodDeliveryManDTO filtrados.
   */
  public getFoodDeliveryMenByFilter(
    filter: string
  ): Observable<FoodDeliveryMan[]> {
    const operation = 'GET FoodDeliveryMen By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<FoodDeliveryMan[]>(
        `${this.apiUrl}/Extras/GetFoodDeliveryMenByFilter`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene business types filtrados por un criterio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de BusinessTypeDTO filtrados.
   */
  public getBusinessTypesByFilter(filter: string): Observable<BusinessType[]> {
    const operation = 'GET BusinessTypes By Filter';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<BusinessType[]>(`${this.apiUrl}/Extras/GetBusinessTypesByFilter`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene órdenes filtradas por nombre de cliente, negocio y estado.
   * @param businessId ID del negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de OrderDTO filtrados.
   */
  public getOrdersByClientNameAndBusinessAndState(
    businessId: number,
    filter: string
  ): Observable<Order[]> {
    const operation = 'GET Orders By Client Name, Business And State';
    const params = new HttpParams()
      .set('businessId', businessId.toString())
      .set('filter', filter);
    return this.http
      .get<Order[]>(
        `${this.apiUrl}/Extras/GetOrdersByClientNameAndBusinessAndState`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene órdenes filtradas por nombre de cliente, negocio y filtros de estado.
   * @param businessId ID del negocio.
   * @param clientFilter Filtro para el cliente.
   * @param stateFilter Filtro para el estado.
   * @returns Observable con la lista de OrderDTO filtrados.
   */
  public getOrdersByClientNameBusinessAndStateFilter(
    businessId: number,
    clientFilter: string,
    stateFilter: string
  ): Observable<Order[]> {
    const operation = 'GET Orders By Client Name, Business And State Filter';
    const params = new HttpParams()
      .set('businessId', businessId.toString())
      .set('clientFilter', clientFilter)
      .set('stateFilter', stateFilter);
    return this.http
      .get<Order[]>(
        `${this.apiUrl}/Extras/GetOrdersByClientNameBusinessAndStateFilter`,
        { headers: this.headers, params }
      )
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene productos filtrados por nombre y negocio.
   * @param businessId ID del negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de ProductDTO filtrados.
   */
  public getProductsByNameAndBusiness(
    businessId: number,
    filter: string
  ): Observable<Product[]> {
    const operation = 'GET Products By Name And Business';
    const params = new HttpParams()
      .set('businessId', businessId.toString())
      .set('filter', filter);
    return this.http
      .get<Product[]>(`${this.apiUrl}/Extras/GetProductsByNameAndBusiness`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene carritos filtrados por nombre de negocio.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de CartDTO filtrados.
   */
  public getCartsByBusinessName(filter: string): Observable<Cart[]> {
    const operation = 'GET Carts By Business Name';
    const params = new HttpParams().set('filter', filter);
    return this.http
      .get<Cart[]>(`${this.apiUrl}/Extras/GetCartsByBusinessName`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene productos de un carrito filtrados por un criterio.
   * @param cartCode Código del carrito.
   * @param filter Criterio de filtro.
   * @returns Observable con la lista de ProductDTO filtrados.
   */
  public getProductsByCartAndFilter(
    cartCode: number,
    filter: string
  ): Observable<Product[]> {
    const operation = 'GET Products By Cart And Filter';
    const params = new HttpParams()
      .set('cartCode', cartCode.toString())
      .set('filter', filter);
    return this.http
      .get<Product[]>(`${this.apiUrl}/Extras/GetProductsByCartAndFilter`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene las últimas 10 órdenes de un cliente.
   * @param clientId ID del cliente.
   * @returns Observable con la lista de OrderDTO.
   */
  public getLast10OrdersByClient(clientId: number): Observable<Order[]> {
    const operation = 'GET Last 10 Orders By Client';
    const params = new HttpParams().set('clientId', clientId.toString());
    return this.http
      .get<Order[]>(`${this.apiUrl}/Extras/GetLast10OrdersByClient`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }

  /**
   * Obtiene órdenes filtradas por una fecha específica.
   * @param dateFilter Filtro de fecha.
   * @returns Observable con la lista de OrderDTO filtrados.
   */
  public getOrdersByDateFilter(dateFilter: string): Observable<Order[]> {
    const operation = 'GET Orders By Date Filter';
    const params = new HttpParams().set('dateFilter', dateFilter);
    return this.http
      .get<Order[]>(`${this.apiUrl}/Extras/GetOrdersByDateFilter`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError(this.handleError(operation)));
  }
}
