import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ProofOfPaymentService,  ProofOfPaymentCreate} from '../../../../../Services/ProofOfPayment/proof-of-payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, OrderCreate, OrderProductCreate } from '../../../../../Services/Order/order.service';
import { FoodDeliveryManService, FoodDeliveryManUpdate } from '../../../../../Services/FoodDeliveryMan/food-delivery-man.service';
import { ClientService } from '../../../../../Services/Client/client.service';

@Component({
  selector: 'app-generate-order',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
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
    private POPaymentService : ProofOfPaymentService,
    private snackBar : MatSnackBar,
    private orderService : OrderService,
    private FDManService : FoodDeliveryManService,
    private clientService : ClientService,
    
    @Inject(MAT_DIALOG_DATA) public data: { Products: []}
  ) {}
  onConfirm() {
    if (this.bin && this.month && this.year && this.cardholderName && this.cvc) {
      const paymentDetails = {
        bin: Number(this.bin.slice(-4)),
        month: this.month,
        year: this.year,
        cardholderName: this.cardholderName,
        cvc: this.cvc,
      };
  
      console.log('Detalles de pago guardados:', paymentDetails);
  
      // Obtener el cliente actual
      const currentClient = this.clientService.currentClientValue;
      console.log('Cliente actual:', currentClient);
  
      if (!currentClient) {
        alert('No se encontró el cliente actual.');
        return;
      }
  
      const clientCanton = currentClient.Canton;
      if (!clientCanton) {
        alert('El cliente no tiene un cantón asignado.');
        return;
      }
  
      // Obtener todos los repartidores y filtrarlos manualmente por cantón y disponibilidad ya que la funcion de extras solo me daba listas vacias
      this.FDManService.getAll().subscribe({
        next: deliveryMen => {
          console.log('Repartidores obtenidos:', deliveryMen);
          const filteredDeliveryMen = deliveryMen.filter(dm => dm.Canton === clientCanton && dm.State?.toLowerCase() === "disponible");
          if (filteredDeliveryMen.length > 0) {
            const availableDelivery = filteredDeliveryMen[0];  // Seleccionar el primer repartidor disponible
            console.log('Repartidor disponible encontrado:', availableDelivery);
  
            // Cambiar el estado del repartidor a "No disponible"
            const updatedDeliveryMan: FoodDeliveryManUpdate = {
              Name: availableDelivery.Name,
              FirstSurname: availableDelivery.FirstSurname,
              SecondSurname: availableDelivery.SecondSurname,
              Province: availableDelivery.Province,
              Canton: availableDelivery.Canton,
              District: availableDelivery.District,
              Password: availableDelivery.Password,
              State: 'No disponible', 
            };
  
            // Actualizar el estado del repartidor
            this.FDManService.update(availableDelivery.UserId, updatedDeliveryMan).subscribe({
              next: () => {
                console.log('Estado del repartidor actualizado a "No disponible".');
                this.createOrdert(availableDelivery.UserId, paymentDetails);
              },
              error: err => {
                console.error('Error al actualizar el estado del repartidor:', err);
                alert('Ocurrió un error al actualizar el estado del repartidor.');
              },
            });
          } else {
            alert('No hay delivery disponible en su cantón en este momento.');
          }
        },
        error: err => {
          console.error('Error al obtener los delivery:', err);
          alert('Ocurrió un error al obtener los delivery.');
        },
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  

  createOrdert(foodDeliveryManId: string, paymentDetails: any) {
    const currentClient = this.clientService.currentClientValue;

    if (!currentClient) {
      alert('No se encontró el cliente actual para crear la orden.');
      return;
    }

    const newOrder: OrderCreate = {
      State: 'Preparando',
      Client_Id: currentClient.Id,
      FoodDeliveryMan_UserId: foodDeliveryManId,
    };

    this.orderService.create(newOrder).subscribe({
      next: () => {
        this.orderService.getAll().subscribe({
          next: orders => {
            const lastOrder = orders[orders.length - 1];

            // Agregar productos a la orden
            this.data.Products.forEach(productCode => {
              const newProduct: OrderProductCreate = {
                Order_Code: lastOrder.Code,
                Product_Code: productCode,
              };

              this.orderService.addProduct(newProduct).subscribe({
                next: () => {
                  console.log(`Producto con código ${productCode} añadido a la orden ${lastOrder.Code}`);
                },
                error: err => {
                  console.error(`Error al añadir producto ${productCode} a la orden:`, err);
                },
              });
            });

            // Crear el pago una vez añadidos los productos
            this.createPOPayment(paymentDetails, lastOrder.Code);
          },
          error: err => {
            console.error('Error al obtener las órdenes:', err);
            alert('Ocurrió un error al obtener las órdenes.');
          },
        });
      },
      error: err => {
        console.error('Error al crear la orden:', err);
        alert('Ocurrió un error al crear la orden.');
      },
    });
  }

  createPOPayment(paymentDetails: any, orderCode: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear().toString()}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

    const newPOPayment: ProofOfPaymentCreate = {
      CreditCardName: paymentDetails.cardholderName,
      LastDigitsCreditCard: paymentDetails.bin,
      Date: formattedDate,
      Time: formattedTime,
      Order_Code: orderCode,
    };

    this.POPaymentService.create(newPOPayment).subscribe({
      next: response => {
        console.log('Pago creado exitosamente:', response);
        this.snackBar.open('Pago realizado. Código de la orden: ' + orderCode, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Error al crear el pago:', err);
        alert('Ocurrió un error al procesar el pago.');
      },
    });
  }
}