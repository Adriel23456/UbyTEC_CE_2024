import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProofOfPaymentCreate, ProofOfPaymentService } from '../../../Services/ProofOfPayment/proof-of-payment.service';
import { OrderCreate, OrderProductCreate, OrderService } from '../../../Services/Order/order.service';
import { ClientService } from '../../../Services/Client/client.service';
import { CartProduct } from '../../../Services/Cart/cart.service';
import { catchError, concatMap, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-generate-order',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './generate-order.component.html',
  styleUrl: './generate-order.component.css'
})
export class GenerateOrderComponent {
  bin: string = '';
  month: number | null = null;
  year: number | null = null;
  cardholderName: string = '';
  cvc: string = '';

  constructor(
    public dialogRef: MatDialogRef<GenerateOrderComponent>,
    private POPaymentService: ProofOfPaymentService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: { products: CartProduct[] }
  ) {}

  private validateFormData(): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    // Validar BIN
    if (!/^\d{16}$/.test(this.bin)) {
      this.snackBar.open('El BIN debe contener exactamente 16 dígitos numéricos', 'Cerrar');
      return false;
    }
    // Validar fecha
    if (!this.month || !this.year || 
        this.month < 1 || this.month > 12 ||
        this.year < currentYear || 
        (this.year === currentYear && this.month < currentMonth)) {
      this.snackBar.open('Fecha de vencimiento inválida', 'Cerrar');
      return false;
    }
    // Validar nombre
    if (!this.cardholderName.trim()) {
      this.snackBar.open('Debe ingresar el nombre del titular', 'Cerrar');
      return false;
    }
    // Validar CVC
    if (!/^\d{3}$/.test(this.cvc)) {
      this.snackBar.open('El CVC debe contener exactamente 3 dígitos numéricos', 'Cerrar');
      return false;
    }
    return true;
  }

  onConfirm() {
    if (!this.validateFormData()) return;
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.snackBar.open('No se encontró el cliente actual', 'Cerrar');
      return;
    }
    const newOrder: OrderCreate = {
      State: 'Preparando',
      Client_Id: currentClient.Id,
      FoodDeliveryMan_UserId: 'EsperandoRepartidor'
    };
    // 1. Crear la orden
    this.orderService.create(newOrder).subscribe({
      next: (createdOrder) => {
        // 2. Iniciar la adición secuencial de productos
        this.addNextProduct(createdOrder.Code, 0, []);
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
        this.snackBar.open('Error al crear la orden', 'Cerrar');
      }
    });
  }

  // Método auxiliar para añadir productos de forma secuencial
  private addNextProduct(orderCode: number, productIndex: number, processedProducts: CartProduct[]): void {
    // Si no hay más productos por procesar, crear el comprobante
    if (productIndex >= this.data.products.length) {
      this.createProofOfPayment(orderCode);
      return;
    }
    const currentProduct = this.data.products[productIndex];
    let addedCount = 0;
    // Función auxiliar para añadir una unidad del producto actual
    const addProductUnit = () => {
      const orderProduct: OrderProductCreate = {
        Order_Code: orderCode,
        Product_Code: currentProduct.Product_Code
      };
      this.orderService.addProduct(orderProduct).subscribe({
        next: () => {
          addedCount++;
          if (addedCount < currentProduct.Amount) {
            // Si faltan unidades por añadir del producto actual, continuar
            addProductUnit();
          } else {
            // Si ya añadimos todas las unidades del producto actual, pasar al siguiente
            this.addNextProduct(orderCode, productIndex + 1, [...processedProducts, currentProduct]);
          }
        },
        error: (error) => {
          console.error('Error al añadir producto:', error);
          this.snackBar.open('Error al procesar los productos', 'Cerrar');
        }
      });
    };
    // Iniciar la adición de unidades para el producto actual
    addProductUnit();
  }

  createProofOfPayment(orderCode: number) {
    const now = new Date();
    const proofOfPayment: ProofOfPaymentCreate = {
      CreditCardName: this.cardholderName,
      LastDigitsCreditCard: parseInt(this.bin.slice(-4)),
      Date: `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`,
      Time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      Order_Code: orderCode
    };
    this.POPaymentService.create(proofOfPayment).subscribe({
      next: () => {
        this.snackBar.open('Orden creada exitosamente', 'Cerrar');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al crear el comprobante:', error);
        this.snackBar.open('Error al crear el comprobante', 'Cerrar');
      }
    });
  }
}
