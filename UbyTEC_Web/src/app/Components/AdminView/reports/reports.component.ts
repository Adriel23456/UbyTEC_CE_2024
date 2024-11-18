import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PrincipalService, ConsolidatedSalesReport, SalesReportByAffiliate, TopSellingProducts } from '../../../Services/Principal/principal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor(private principalService: PrincipalService) {}

  generateConsolidatedSalesReport(): void {
    this.principalService.getConsolidatedSalesReport().subscribe({
      next: (data: ConsolidatedSalesReport[]) => {
        this.generatePDF('Consolidado de Ventas', data, [
          { header: 'ID Cliente', dataKey: 'ClientId' },
          { header: 'Nombre Cliente', dataKey: 'ClientName' },
          { header: 'Afiliado', dataKey: 'Affiliate' },
          { header: 'Compras', dataKey: 'Purchases' },
          { header: 'Conductor', dataKey: 'Conductor' },
          { header: 'Monto Total', dataKey: 'TotalAmount' },
          { header: 'Monto Servicio', dataKey: 'ServiceAmount' }
        ]);
      },
      error: (error) => {
        console.error('Error al obtener el reporte de ventas consolidado:', error);
      }
    });
  }

  generateSalesByAffiliateReport(): void {
    this.principalService.getSalesReportByAffiliate().subscribe({
      next: (data: SalesReportByAffiliate[]) => {
        this.generatePDF('Ventas por Afiliado', data, [
          { header: 'Afiliado', dataKey: 'Affiliate' },
          { header: 'Compras', dataKey: 'Purchases' },
          { header: 'Monto Total', dataKey: 'TotalAmount' },
          { header: 'Monto Servicio', dataKey: 'ServiceAmount' }
        ]);
      },
      error: (error) => {
        console.error('Error al obtener el reporte de ventas por afiliado:', error);
      }
    });
  }

  generateTopSellingProductsReport(): void {
    this.principalService.getTopSellingProducts().subscribe({
      next: (data: TopSellingProducts[]) => {
        this.generatePDF('Productos Más Vendidos', data, [
          { header: 'Nombre Producto', dataKey: 'ProductName' },
          { header: 'Afiliado', dataKey: 'Affiliate' },
          { header: 'Total Vendido', dataKey: 'TotalSold' },
          { header: 'Total Ingresos', dataKey: 'TotalRevenue' }
        ]);
      },
      error: (error) => {
        console.error('Error al obtener el reporte de productos más vendidos:', error);
      }
    });
  }

  /**
   * Genera un PDF utilizando jsPDF y autoTable.
   * @param title Título del reporte.
   * @param data Datos del reporte.
   * @param columns Columnas para autoTable.
   */
  private generatePDF(title: string, data: any[], columns: any[]): void {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Fecha de generación
    const date = new Date();
    doc.setFontSize(11);
    doc.text(`Fecha: ${date.toLocaleDateString()}`, 14, 30);

    // Generar la tabla
    autoTable(doc, {
      startY: 35,
      head: [columns.map(col => col.header)],
      body: data.map(row => columns.map(col => row[col.dataKey])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [92, 103, 242] },
      theme: 'striped'
    });

    // Guardar el PDF
    doc.save(`${title}.pdf`);
  }
}