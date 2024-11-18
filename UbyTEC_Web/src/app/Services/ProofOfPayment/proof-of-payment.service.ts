import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ComunicationService } from '../Comunication/comunication.service';

export interface ProofOfPayment {
  Code?: number | null; // PK
  CreditCardName: string;
  LastDigitsCreditCard: number;
  TotalPayment?: number | null;
  Date: string; // Format "dd-mm-yyyy"
  Time: string; // Format "dd-mm-yyyy"
  ClientFullName?: string | null;
  ClientPhone?: number;
  Order_Code: number;
}

export interface ProofOfPaymentUpdate {
  CreditCardName: string;
  LastDigitsCreditCard: number;
  Date: string; // Format "dd-mm-yyyy"
  Time: string; // Format "dd-mm-yyyy"
  Order_Code: number;
}

export interface ProofOfPaymentCreate {
  CreditCardName: string;
  LastDigitsCreditCard: number;
  Date: string; // Format "dd-mm-yyyy"
  Time: string; // Format "dd-mm-yyyy"
  Order_Code: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProofOfPaymentService {
  constructor(
    private comunicationService: ComunicationService
  ) {}
 
  /**
   * Obtiene todos los comprobantes de pago.
   */
  public getAll(): Observable<ProofOfPayment[]> {
    return this.comunicationService.getProofOfPayments().pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Obtiene un comprobante de pago por su código. Requiere un code
   */
  public getByCode(code: number): Observable<ProofOfPayment> {
    return this.comunicationService.getProofOfPaymentByCode(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Crea un nuevo comprobante de pago. Requiere un objeto tipo ProofOfPaymentCreate
   */
  public create(proofOfPayment: ProofOfPaymentCreate): Observable<ProofOfPayment> {
    return this.comunicationService.createProofOfPayment(proofOfPayment).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Actualiza un comprobante de pago existente. Requiere un objeto tipo ProofOfPaymentUpdate y un code
   */
  public update(code: number, proofOfPayment: ProofOfPaymentUpdate): Observable<void> {
    return this.comunicationService.updateProofOfPayment(code, proofOfPayment).pipe(
      catchError(error => throwError(() => error))
    );
  }
 
  /**
   * Elimina un comprobante de pago.
   */
  public delete(code: number): Observable<void> {
    return this.comunicationService.deleteProofOfPayment(code).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
