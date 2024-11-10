import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientCreate, ClientService, ClientUpdate } from '../../../Services/Client/client.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';

type UserType = 'cliente' | 'administrador' | 'afiliado' | 'repartidor';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    selectedUserType: UserType = 'cliente';
    router = inject(Router);

    userTypes = [
        { value: 'cliente' as UserType, label: 'Cliente' },
        { value: 'administrador' as UserType, label: 'Administrador' },
        { value: 'afiliado' as UserType, label: 'Afiliado' },
        { value: 'repartidor' as UserType, label: 'Repartidor' }
    ];

    constructor(private dialog: MatDialog, private clientService: ClientService) {}

    selectUserType(type: UserType): void {
        this.selectedUserType = type;
        this.username = '';
        this.password = '';
    }

    getLoginTitle(): string {
        const titles = {
            cliente: 'Bienvenido Cliente',
            administrador: 'Acceso Administrativo',
            afiliado: 'Portal de Afiliados',
            repartidor: 'Acceso Repartidor'
        };
        return titles[this.selectedUserType];
    }

    onLogin(): void {
        if (this.selectedUserType === 'cliente') {
            const clientLogin = {
                UserId: this.username,
                Password: this.password
            };
            this.clientService.login(clientLogin).subscribe({
                next: (client) => {
                    console.log('Login exitoso:', client);
                    this.openDialog('Inicio de Sesión', 'Login exitoso como cliente');
                },
                error: (err) => {
                    // Extraemos el mensaje de error del objeto Error
                    const errorMessage = err.toString();
                    console.error('Error en login:', errorMessage);
                    
                    // Verificamos si el mensaje contiene las cadenas específicas
                    if (errorMessage.includes('not found')) {
                        this.openDialog('Error', `Usuario "${this.username}" no encontrado`);
                    } else if (errorMessage.includes('Incorrect password')) {
                        this.openDialog('Error', 'Contraseña incorrecta');
                    } else {
                        this.openDialog('Error', 'Error en el inicio de sesión');
                    }
                }
            });
        } else {
            this.openDialog('Inicio de Sesión', `Intentando iniciar sesión como ${this.selectedUserType}`);
        }
    }

    onForgotPassword(): void {
        if (this.selectedUserType === 'afiliado') {
            this.openDialog('Recuperación de Contraseña', 
                'Se ha enviado un correo con su contraseña actual. Por favor, revise su bandeja de entrada.');
        } else {
            this.openDialog('Recuperación de Contraseña', 
                'Para recuperar su contraseña contacte al 2222-2222 y así recibir una contraseña provisional');
        }
    }

    onRegister(): void {
        if (this.selectedUserType === 'cliente') {
            console.log('Registro de cliente');
        } else if (this.selectedUserType === 'afiliado') {
            console.log('Registro de afiliado');
        } else if (this.selectedUserType === 'repartidor') {
            console.log('Registro de repartidor');
        } else {
            console.error('Intento de registro de una entidad desconocida');
        }
    }

    openDialog(title: string, message: string): void {
        this.dialog.open(DialogComponent, {
            width: '300px',
            data: { title, message }
        });
    }
}
