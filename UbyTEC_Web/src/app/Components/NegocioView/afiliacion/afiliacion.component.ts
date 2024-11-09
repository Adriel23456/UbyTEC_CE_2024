import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { NegocioService } from '../../../Services/Negocio/negocio.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-afiliacion',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './afiliacion.component.html',
  styleUrl: './afiliacion.component.css'
})
export class AfiliacionComponent {
  constructor(public service: NegocioService) {}
}
