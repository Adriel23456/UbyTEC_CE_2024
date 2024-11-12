import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';

@Component({
  selector: 'app-afiliacion',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './afiliacion.component.html',
  styleUrl: './afiliacion.component.css'
})

export class AfiliacionComponent {
  constructor(public service: BusinessAssociateService) {}
}
