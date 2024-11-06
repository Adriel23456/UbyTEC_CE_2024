import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../../Services/Login/login.service';
import { DialogComponent } from '../dialog/dialog.component';
import {FormsModule} from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIf,
    DialogComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  router = inject(Router);
  constructor(
    private dialog: MatDialog
  ) {}

  onLogin(): void {
    console.log("Funciona");
  }

  onForgotPassword(): void {
    this.openDialog('Recuperación de Contraseña', 'Para recuperar su contraseña contacte al 2222-2222 y asi recibir una contraseña provisional');
  }
  
  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }

  onRegister(): void {
    this.openDialog('Registro de xxx', 'XXXX');
  }
}
