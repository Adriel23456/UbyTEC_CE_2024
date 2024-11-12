import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material/material.module';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})
export class UpdateDialogComponent {
}