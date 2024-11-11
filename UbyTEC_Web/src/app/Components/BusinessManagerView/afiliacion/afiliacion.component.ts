import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { NegocioService } from '../../../Services/Negocio/negocio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-afiliacion',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatTableModule, CommonModule],
  templateUrl: './afiliacion.component.html',
  styleUrl: './afiliacion.component.css'
})

export class AfiliacionComponent {
  constructor(public service: NegocioService) {}
}
