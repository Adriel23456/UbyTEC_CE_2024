import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface FeedBack {
  Id: number; // PK
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

export interface FeedBackUpdate {
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

export interface FeedBackCreate {
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
export class FeedBackService {
  constructor(
    private comunicationService: ComunicationService
  ) {}
 
  /**
   * Obtiene todos los feedback.
   */
  public getAll(): Observable<FeedBack[]> {
    return this.comunicationService.getFeedBacks().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene un feedback por su ID. Requiere de un id
   */
  public getById(id: number): Observable<FeedBack> {
    return this.comunicationService.getFeedBackById(id).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Crea un nuevo feedback. Requiere de un objeto tipo FeedBackCreate
   */
  public create(feedBack: FeedBackCreate): Observable<FeedBack> {
    // Validar calificaciones antes de enviar
    if (this.validateGrades(feedBack)) {
      return this.comunicationService.createFeedBack(feedBack).pipe(
        catchError(error => throwError(() => error))
      );
    } else {
      return throwError(() => new Error('Las calificaciones deben estar entre 0 y 5'));
    }
  }
 
  /**
   * Actualiza un feedback existente. Requiere de un objeto tipo FeedBackUpdate y un id
   */
  public update(id: number, feedBack: FeedBackUpdate): Observable<void> {
    // Validar calificaciones antes de enviar
    if (this.validateGrades(feedBack)) {
      return this.comunicationService.updateFeedBack(id, feedBack).pipe(
        catchError(error => throwError(() => error))
      );
    } else {
      return throwError(() => new Error('Las calificaciones deben estar entre 0 y 5'));
    }
  }
 
  /**
   * Elimina un feedback.
   */
  public delete(id: number): Observable<void> {
    return this.comunicationService.deleteFeedBack(id).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Valida que las calificaciones estén en el rango correcto (0-5)
   */
  private validateGrades(feedBack: FeedBackCreate | FeedBackUpdate): boolean {
    return (
      feedBack.BusinessGrade >= 0 && 
      feedBack.BusinessGrade <= 5 &&
      feedBack.OrderGrade >= 0 && 
      feedBack.OrderGrade <= 5 &&
      feedBack.DeliveryManGrade >= 0 && 
      feedBack.DeliveryManGrade <= 5
    );
  }
}
