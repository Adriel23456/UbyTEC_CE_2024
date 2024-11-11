import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

export interface ProductosArr {
  id: number,
  nombre: string,
  categoria: string,
  fotos: string,
  precio: number
}

const PRODUCTOS_DATA: ProductosArr[] = [
  {id: 1, nombre: "Big Mac", categoria: "Plato principal", 
    fotos:"https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-big-mac-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off",
    precio: 3400
  },
  {id: 2, nombre: "Triple con bacon", categoria: "Plato principal", 
    fotos:"https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-big-mac-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off",
    precio: 3750
  },
  {id: 3, nombre: "McPapas Pequeñas", categoria: "Complementos", 
    fotos:"https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-big-mac-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off",
    precio: 1100
  },
  {id: 4, nombre: "Coca-Cola mediana", categoria: "Bebidas", 
    fotos:"https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-big-mac-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off",
    precio: 1200
  },
  {id: 5, nombre: "McFlurry Oreo", categoria: "Postres", 
    fotos:"https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-big-mac-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off",
    precio: 1900
  },
];

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  searchKey = '';
  displayedColumns: string[] = ['nombre', 'categoria', 'fotos', 'precio','actions'];
  listData = new MatTableDataSource(PRODUCTOS_DATA);

  createDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      height: '800px'
    });
  }

  updateDialog(): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px',
      height: '800px'
    });
  }
}
