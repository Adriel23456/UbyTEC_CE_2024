import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrderService, Order, OrderProduct } from '../../../Services/Order/order.service';
import { ProductService, Product } from '../../../Services/Product/product.service';
import { ClientService } from '../../../Services/Client/client.service';
import { ProofOfPaymentService, ProofOfPayment } from '../../../Services/ProofOfPayment/proof-of-payment.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface OrderProductDetails {
  productName: string;
  category: string;
  amount: number;
  totalPrice: number;
}

@Component({
  selector: 'app-order-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {
  order: Order | null = null;
  clientFullName: string = '';
  proofOfPayment: ProofOfPayment | null = null;

  productsDataSource = new MatTableDataSource<OrderProductDetails>();
  displayedColumns: string[] = ['productName', 'category', 'amount', 'totalPrice'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderCode: number },
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientService,
    private proofOfPaymentService: ProofOfPaymentService
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    // 1. Obtener la orden
    this.orderService.getByCode(this.data.orderCode).subscribe(order => {
      this.order = order;
      
      // 2. Obtener el cliente
      this.clientService.getById(order.Client_Id).subscribe(client => {
        this.clientFullName = client.FullName;
      });

      // 3. Obtener los productos de la orden y sus detalles
      this.orderService.getProductsByCode(order.Code).subscribe(orderProducts => {
        const productRequests = orderProducts.map(op => 
          this.productService.getByCode(op.Product_Code).pipe(
            map(product => ({
              productName: product.Name,
              category: product.Category,
              amount: op.Amount,
              totalPrice: product.Price * op.Amount
            }))
          )
        );

        forkJoin(productRequests).subscribe(products => {
          this.productsDataSource.data = products;
          this.productsDataSource.paginator = this.paginator;
        });
      });

      // 4. Obtener todos los comprobantes y filtrar por el código de orden
      this.proofOfPaymentService.getAll().subscribe(proofs => {
        this.proofOfPayment = proofs.find(p => p.Order_Code === order.Code) || null;
      });
    });
  }

  calculateTotal(): number {
    return this.productsDataSource.data.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }
}