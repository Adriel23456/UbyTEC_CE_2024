import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client } from '../Client/client.service';
import { Admin, AdminPhone } from '../Admin/admin.service';
import { FoodDeliveryMan, FoodDeliveryManPhone } from '../FoodDeliveryMan/food-delivery-man.service';
import { BusinessAssociate, BusinessAssociatePhone } from '../BusinessAssociate/business-associate.service';
import { BusinessType } from '../BusinessType/business-type.service';
import { BusinessManager, BusinessManagerPhone } from '../BusinessManager/business-manager.service';
import { Product } from '../Product/product.service';
import { Cart } from '../Cart/cart.service';
import { FeedBack } from '../FeedBack/feed-back.service';

export interface FeedBackMongo {
  Id: string; // PK de mongo (No nos intereza)
  Id_SQL: string; // Verdadedo identificador de la interfaz
  FeedBack_Business: string;
  BusinessGrade: number;
  FeedBack_Order: string;
  OrderGrade: number;
  FeedBack_DeliveryMan: string;
  DeliveryManGrade: number;
  FoodDeliveryMan_UserId: string;
  Order_Code: number;
  BusinessAssociate_Legal_Id: number;
}

@Injectable({
  providedIn: 'root'
})
export class MongoDbApiService {
  private apiUrl = 'https://mongodb-grh9axcmdqcvfudt.canadacentral-01.azurewebsites.net/api';
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

  // -------------------
  // Métodos para Client
  // -------------------

  /**
   * Crea un nuevo cliente.
   * @param client Objeto de tipo Client para crear el cliente.
   * @returns Observable con el cliente creado.
   */
  createClientMongo(clientCreate: Client): Observable<Client> {
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
   * @param client Objeto de tipo Client con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateClientMongo(id: number, clientUpdate: Client): Observable<void> {
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
  deleteClientMongo(id: number): Observable<void> {
    const operation = `DELETE Client ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Client/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // ------------------
  // Métodos para Admin
  // ------------------

  /**
   * Crea un nuevo administrador.
   * @param admin Objeto de tipo Admin para crear el administrador.
   * @returns Observable con el administrador creado.
   */
  createAdminMongo(adminCreate: Admin): Observable<Admin> {
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
   * @param admin Objeto con los datos a actualizar.
   * @returns Observable vacío.
   */
  updateAdminMongo(id: number, adminUpdate: Admin): Observable<void> {
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
  deleteAdminMongo(id: number): Observable<void> {
    const operation = `DELETE Admin ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Admin/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para AdminPhone
  // -----------------------------------

  /**
   * Crea un nuevo teléfono para un administrador.
   * @param adminPhone Objeto con el ID del admin y el número de teléfono.
   * @returns Observable con el teléfono creado.
   */
  createAdminPhoneMongo(adminPhone: AdminPhone): Observable<AdminPhone> {
    const operation = 'POST Create Admin Phone';
    return this.http.post<AdminPhone>(
      `${this.apiUrl}/AdminPhone`,
      adminPhone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Actualiza un teléfono de administrador existente.
   * @param id ID del administrador.
   * @param adminPhoneUpdate Nuevo número de teléfono.
   * @returns Observable vacío.
   */
  updateAdminPhoneMongo(id: number, adminPhoneUpdate: AdminPhone): Observable<void> {
    const operation = `PUT Update Admin Phone: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/AdminPhone/${id}`,
      adminPhoneUpdate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Elimina un teléfono de administrador.
   * @param id ID del administrador.
   * @param phone Número de teléfono a eliminar.
   * @returns Observable vacío.
   */
  deleteAdminPhoneMongo(id: number): Observable<void> {
    const operation = `DELETE Admin Phone: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/AdminPhone/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FoodDeliveryMan
  // -----------------------------------

  createFoodDeliveryManMongo(foodDeliveryMan: FoodDeliveryMan): Observable<FoodDeliveryMan> {
    const operation = 'POST Create FoodDeliveryMan';
    return this.http.post<FoodDeliveryMan>(
      `${this.apiUrl}/FoodDeliveryMan`,
      foodDeliveryMan,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryManMongo(id: string, update: FoodDeliveryMan): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan ID: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/FoodDeliveryMan/${id}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryManMongo(id: string): Observable<void> {
    const operation = `DELETE FoodDeliveryMan ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/FoodDeliveryMan/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FoodDeliveryManPhone
  // -----------------------------------

  createFoodDeliveryManPhoneMongo(phone: FoodDeliveryManPhone): Observable<FoodDeliveryManPhone> {
    const operation = 'POST Create FoodDeliveryMan Phone';
    return this.http.post<FoodDeliveryManPhone>(
      `${this.apiUrl}/FoodDeliveryManPhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateFoodDeliveryManPhoneMongo(id: string, update: FoodDeliveryManPhone): Observable<void> {
    const operation = `PUT Update FoodDeliveryMan Phone: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/FoodDeliveryManPhone/${id}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteFoodDeliveryManPhoneMongo(id: string): Observable<void> {
    const operation = `DELETE FoodDeliveryMan Phone: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/FoodDeliveryManPhone/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociate 
  // -----------------------------------

  createBusinessAssociateMongo(businessAssociate: BusinessAssociate): Observable<BusinessAssociate> {
    const operation = 'POST Create BusinessAssociate';
    return this.http.post<BusinessAssociate>(
      `${this.apiUrl}/BusinessAssociate`,
      businessAssociate,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociateMongo(id: number, update: BusinessAssociate): Observable<void> {
    const operation = `PUT Update BusinessAssociate ID: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessAssociate/${id}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociateMongo(id: number): Observable<void> {
    const operation = `DELETE BusinessAssociate ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessAssociate/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessAssociatePhone
  // -----------------------------------

  createBusinessAssociatePhoneMongo(phone: BusinessAssociatePhone): Observable<BusinessAssociatePhone> {
    const operation = 'POST Create BusinessAssociate Phone';
    return this.http.post<BusinessAssociatePhone>(
      `${this.apiUrl}/BusinessAssociatePhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessAssociatePhoneMongo(id: number, oldPhone: number, update: BusinessAssociatePhone): Observable<void> {
    const operation = `PUT Update BusinessAssociate Phone: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessAssociatePhone/${id}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessAssociatePhoneMongo(id: number, phone: number): Observable<void> {
    const operation = `DELETE BusinessAssociate Phone: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessAssociatePhone/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessType
  // -----------------------------------

  /**
   * Crea un nuevo tipo de negocio.
   * @param businessType Objeto de tipo BusinessTypeCreate para crear el tipo de negocio.
   * @returns Observable con el tipo de negocio creado.
   */
  createBusinessTypeMongo(businessType: BusinessType): Observable<BusinessType> {
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
  updateBusinessTypeMongo(id: number, businessType: BusinessType): Observable<void> {
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
  deleteBusinessTypeMongo(id: number): Observable<void> {
    const operation = `DELETE BusinessType ID: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessType/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // ---------------------------
  // Métodos para BusinessManager
  // ---------------------------

  createBusinessManagerMongo(businessManager: BusinessManager): Observable<BusinessManager> {
    const operation = 'POST Create BusinessManager';
    return this.http.post<BusinessManager>(
      `${this.apiUrl}/BusinessManager`,
      businessManager,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManagerMongo(id: string, businessManager: BusinessManager): Observable<void> {
    const operation = `PUT Update BusinessManager Email: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessManager/${id}`,
      businessManager,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManagerMongo(id: string): Observable<void> {
    const operation = `DELETE BusinessManager Email: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessManager/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para BusinessManagerPhone
  // -----------------------------------

  createBusinessManagerPhoneMongo(phone: BusinessManagerPhone): Observable<BusinessManagerPhone> {
    const operation = 'POST Create BusinessManager Phone';
    return this.http.post<BusinessManagerPhone>(
      `${this.apiUrl}/BusinessManagerPhone`,
      phone,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateBusinessManagerPhoneMongo(email: string, update: BusinessManagerPhone): Observable<void> {
    const operation = `PUT Update BusinessManager Phone: ${email}`;
    return this.http.put<void>(
      `${this.apiUrl}/BusinessManagerPhone/${email}`,
      update,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteBusinessManagerPhoneMongo(email: string): Observable<void> {
    const operation = `DELETE BusinessManager Phone: ${email}`;
    return this.http.delete<void>(
      `${this.apiUrl}/BusinessManagerPhone/${email}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // ---------------------
  // Métodos para Product
  // ---------------------

  createProductMongo(product: Product): Observable<Product> {
    const operation = 'POST Create Product';
    return this.http.post<Product>(
      `${this.apiUrl}/Product`,
      product,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateProductMongo(id: number, product: Product): Observable<void> {
    const operation = `PUT Update Product Code: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/Product/${id}`,
      product,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteProductMongo(id: number): Observable<void> {
    const operation = `DELETE Product Code: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Product/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para Cart
  // -----------------------------------

  createCartMongo(cart: Cart): Observable<Cart> {
    const operation = 'POST Create Cart';
    return this.http.post<Cart>(
      `${this.apiUrl}/Cart`,
      cart,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateCartMongo(id: number, cart: Cart): Observable<void> {
    const operation = `PUT Update Cart Code: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/Cart/${id}`,
      cart,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteCartMongo(id: number): Observable<void> {
    const operation = `DELETE Cart Code: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/Cart/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  // -----------------------------------
  // Métodos para FeedBack (Identificado por id)
  // -----------------------------------

  /**
   * Obtener todos los FeedBacks
   * @returns Observable de FeedBack[]
   */
  getFeedBacksMongo(): Observable<FeedBack[]> {
    const operation = 'GET FeedBacks';
    return this.http.get<FeedBackMongo[]>(
      `${this.apiUrl}/FeedBack`,
      { headers: this.headers }
    ).pipe(
      map((mongoArray: FeedBackMongo[]) => mongoArray.map(mongo => this.convertInterface(mongo))),
      catchError(this.handleError(operation))
    );
  }

  /**
   * Obtener un FeedBack por su Id
   * @param id Identificador del FeedBack
   * @returns Observable de FeedBack
   */
  getFeedBackByIdMongo(id: string): Observable<FeedBack> {
    const operation = `GET FeedBack By Id: ${id}`;
    return this.http.get<FeedBackMongo>(
      `${this.apiUrl}/FeedBack/${id}`,
      { headers: this.headers }
    ).pipe(
      map((mongo: FeedBackMongo) => this.convertInterface(mongo)),
      catchError(this.handleError(operation))
    );
  }
  
  createFeedBackMongo(feedBack: FeedBack): Observable<FeedBack> {
    const operation = 'POST Create FeedBack';
    return this.http.post<FeedBack>(
      `${this.apiUrl}/FeedBack`,
      feedBack,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  updateFeedBackMongo(id: number, feedBack: FeedBack): Observable<void> {
    const operation = `PUT Update FeedBack Id: ${id}`;
    return this.http.put<void>(
      `${this.apiUrl}/FeedBack/${id}`,
      feedBack,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  deleteFeedBackMongo(id: number): Observable<void> {
    const operation = `DELETE FeedBack Id: ${id}`;
    return this.http.delete<void>(
      `${this.apiUrl}/FeedBack/${id}`,
      { headers: this.headers }
    ).pipe(catchError(this.handleError(operation)));
  }

  /**
   * Función para convertir FeedBackMongo a FeedBack
   * @param mongo Objeto de tipo FeedBackMongo
   * @returns Objeto de tipo FeedBack
   */
  private convertInterface(mongo: FeedBackMongo): FeedBack {
    return {
      Id: Number(mongo.Id_SQL),
      FeedBack_Business: mongo.FeedBack_Business,
      BusinessGrade: mongo.BusinessGrade,
      FeedBack_Order: mongo.FeedBack_Order,
      OrderGrade: mongo.OrderGrade,
      FeedBack_DeliveryMan: mongo.FeedBack_DeliveryMan,
      DeliveryManGrade: mongo.DeliveryManGrade,
      FoodDeliveryMan_UserId: mongo.FoodDeliveryMan_UserId,
      Order_Code: mongo.Order_Code,
      BusinessAssociate_Legal_Id: mongo.BusinessAssociate_Legal_Id
    };
  }
}
