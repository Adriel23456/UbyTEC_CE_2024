import {Component} from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

export interface AdminArr {
  id: number,
  nombre: string,
  direccion: string,
  telefono: number,
  usuario: string
}

const ADMIN_DATA: AdminArr[] = [
  {id: 1, nombre: 'Andres Uriza', direccion: 'Cartago, Cartago', telefono: 88586708, usuario: 'urizandres'
  },
];

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  searchKey = '';
  displayedColumns: string[] = ['usuario', 'nombre', 'telefono', 'direccion','actions'];
  listData = new MatTableDataSource(ADMIN_DATA);

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