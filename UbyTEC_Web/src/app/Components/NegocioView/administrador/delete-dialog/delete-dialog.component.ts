import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

}
