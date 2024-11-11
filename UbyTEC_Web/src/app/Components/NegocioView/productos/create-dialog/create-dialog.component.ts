import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css'
})
export class CreateDialogComponent {
}