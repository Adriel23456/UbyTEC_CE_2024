import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  openDialog(): void {
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

  deleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      height: '250px'
    });
  }
}
