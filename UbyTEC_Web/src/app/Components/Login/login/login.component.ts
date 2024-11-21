import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';
import { ClientLogin, ClientService } from '../../../Services/Client/client.service';
import { AdminLogin, AdminService } from '../../../Services/Admin/admin.service';
import { BusinessManager, BusinessManagerAuthResponse, BusinessManagerLogin, BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { FoodDeliveryManLogin, FoodDeliveryManService } from '../../../Services/FoodDeliveryMan/food-delivery-man.service';
import emailjs from '@emailjs/browser';
import { BusinessAssociate, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';

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

    constructor(
        private dialog: MatDialog,
        private clientService: ClientService,
        private adminService: AdminService,
        private businessManagerService: BusinessManagerService,
        private foodDeliveryManService: FoodDeliveryManService,
        private businessAssociateService: BusinessAssociateService
    ) {}

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
        if (!this.username || !this.password) {
            this.openDialog('Error', 'Por favor, ingrese su usuario y contraseña.');
            return;
        }
        switch (this.selectedUserType) {
            case 'cliente':
                this.loginClient();
                break;
            case 'administrador':
                this.loginAdmin();
                break;
            case 'afiliado':
                this.loginBusinessManager();
                break;
            case 'repartidor':
                this.loginFoodDeliveryMan();
                break;
            default:
                this.openDialog('Error', 'Tipo de usuario desconocido.');
        }
    }

    private loginClient(): void {
        const clientLogin: ClientLogin = {
            UserId: this.username,
            Password: this.password
        };

        this.clientService.login(clientLogin).subscribe({
            next: (client) => {
                this.openDialog('Inicio de Sesión', 'Login exitoso como cliente');
                this.router.navigate(['/sidenavClient']);
            },
            error: (err) => this.handleLoginError(err, 'cliente')
        });
    }

    private loginAdmin(): void {
        const adminLogin: AdminLogin = {
            UserId: this.username,
            Password: this.password
        };

        this.adminService.login(adminLogin).subscribe({
            next: (admin) => {
                this.openDialog('Inicio de Sesión', 'Login exitoso como administrador');
                this.router.navigate(['/sidenavAdmin']);
            },
            error: (err) => this.handleLoginError(err, 'administrador')
        });
    }

    private loginBusinessManager(): void {
        const businessManagerLogin: BusinessManagerLogin = {
            Email: this.username,
            Password: this.password
        };
        this.businessManagerService.login(businessManagerLogin).subscribe({
            next: (response: BusinessManagerAuthResponse) => {
                // Asumimos que el estado es 'Aceptado'
                this.openDialog('Inicio de Sesión', 'Login exitoso como afiliado');
                this.router.navigate(['/sidenavBusiness']);
            },
            error: (err) => {
                // Solución a fuerza bruta: obtener todos los negocios y filtrar por correo
                this.businessManagerService.getAll().subscribe({
                    next: (managers: BusinessManager[]) => {
                        const manager = managers.find(m => m.Email.toLowerCase() === this.username.toLowerCase());
                        if (!manager) {
                            // No existe un negocio con este manager, proceder con el error natural
                            this.handleLoginError(err, 'afiliado');
                        } else {
                            // Obtener el BusinessAssociate asociado
                            this.businessAssociateService.getAll().subscribe({
                                next: (associates: BusinessAssociate[]) => {
                                    const associate = associates.find(a => a.BusinessManager_Email.toLowerCase() === this.username.toLowerCase());
                                    if (!associate) {
                                        // No existe un BusinessAssociate para este manager, proceder con el error natural
                                        this.handleLoginError(err, 'afiliado');
                                    } else {
                                        const state = associate.State;
                                        if (state === 'En espera') {
                                            // Estado en espera: realizar logout y mostrar mensaje
                                            this.businessManagerService.logout();
                                            this.openDialog('Estado del Negocio', 'El negocio se encuentra en espera.');
                                        } else if (state === 'Rechazado') {
                                            // Estado rechazado: realizar logout y mostrar razón de rechazo
                                            this.businessManagerService.logout();
                                            const rejectReason = associate.RejectReason || 'No se proporcionó una razón de rechazo.';
                                            this.openDialog('Estado del Negocio', `El negocio ha sido rechazado. Razón: ${rejectReason}`);
                                        } else {
                                            // Estado desconocido o aceptado pero login falló, proceder con el error natural
                                            this.handleLoginError(err, 'afiliado');
                                        }
                                    }
                                },
                                error: () => {
                                    // Error al obtener BusinessAssociate, proceder con el error natural
                                    this.handleLoginError(err, 'afiliado');
                                }
                            });
                        }
                    },
                    error: () => {
                        // Error al obtener BusinessManagers, proceder con el error natural
                        this.handleLoginError(err, 'afiliado');
                    }
                });
            }
        });
    }

    private loginFoodDeliveryMan(): void {
        const foodDeliveryManLogin: FoodDeliveryManLogin = {
            UserId: this.username,
            Password: this.password
        };

        this.foodDeliveryManService.login(foodDeliveryManLogin).subscribe({
            next: (deliveryMan) => {
                this.openDialog('Inicio de Sesión', 'Login exitoso como repartidor');
                this.router.navigate(['/sidenavFoodDeliveryMan']);
            },
            error: (err) => this.handleLoginError(err, 'repartidor')
        });
    }

    private handleLoginError(error: any, userType: UserType): void {
        const errorMessage = error.message || 'Error en el inicio de sesión';
        console.error(`Error en login (${userType}):`, errorMessage);

        if (errorMessage.toLowerCase().includes('not found')) {
            this.openDialog('Error', `Usuario "${this.username}" no encontrado`);
        } else if (errorMessage.toLowerCase().includes('incorrect password')) {
            this.openDialog('Error', 'Contraseña incorrecta');
        } else {
            this.openDialog('Error', 'Error en el inicio de sesión');
        }
    }

    onForgotPassword(): void {
        if (this.selectedUserType === 'afiliado') {
            if (!this.username) {
                this.openDialog('Error', 'Por favor, ingrese su correo electrónico.');
                return;
            }

            this.businessManagerService.getByEmail(this.username).subscribe({
                next: (manager) => {
                    if (manager) {
                        // Preparar los parámetros del correo
                        const templateParams = {
                            from_name: 'UbyTEC_CE',          // Añadido para el asunto
                            to_name: manager.FullName,       // Ya existente
                            to_email: manager.Email,         // Ya existente
                            password: manager.Password,      // Ya existente
                            reply_to: 'noreply@ubytec_ce.com' // Añadido para el campo "Reply To"
                        };
                        // Enviar el correo utilizando EmailJS
                        emailjs.send('service_5ejt4rh', 'template_6ev2xao', templateParams, 'qUD-Q_YPdWb-wQtEl')
                        .then((response) => {
                            this.openDialog('Recuperación de Contraseña', 
                                'Se ha enviado un correo con su contraseña actual. Por favor, revise su bandeja de entrada.');
                        }, (err) => {
                            this.openDialog('Error', 'Hubo un problema al enviar el correo.');
                        });
                    } else {
                        this.openDialog('Error', 'Afiliado no encontrado.');
                    }
                },
                error: (err) => {
                    this.openDialog('Error', 'Afiliado no encontrado.');
                }
            });
        } else {
            this.openDialog('Recuperación de Contraseña', 
                'Para recuperar su contraseña contacte al 2222-2222 y así recibir una contraseña provisional');
        }
    }

    onRegister(): void {
        if (this.selectedUserType === 'cliente') {
            this.router.navigate(['/loginCreateNewClient']);
        } else if (this.selectedUserType === 'afiliado') {
            this.router.navigate(['/loginCreateNewAffiliate']);
        } else if (this.selectedUserType === 'repartidor') {
            this.router.navigate(['/loginCreateNewFoodDeliveryMan']);
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