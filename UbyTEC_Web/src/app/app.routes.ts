import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { authenticationClientGuard } from './Guards/Client/authentication-client.guard';
import { SidenavClientComponent } from './Components/ClientView/sidenav-client/sidenav-client.component';
import { AfiliacionComponent } from './Components/NegocioView/afiliacion/afiliacion.component';
import { PedidosComponent } from './Components/NegocioView/pedidos/pedidos.component';
import { ProductosComponent } from './Components/NegocioView/productos/productos.component';
import { AdministradorComponent } from './Components/NegocioView/administrador/administrador.component';
import { NegocioViewComponent } from './Components/NegocioView/negocio-view/negocio-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'sidenavClient',
        component: SidenavClientComponent,
        canActivate: [authenticationClientGuard],
        children: [
          { path: '', redirectTo: 'start', pathMatch: 'full' },
          //{ path: 'startInfoClient', component: StartInfoClientComponent }
        ]
      },
      { path: 'sidenavNegocio', 
        component: NegocioViewComponent,
        children: [
            { path: '', redirectTo: 'sidenavNegocio', pathMatch: 'full' },
            { path: 'afiliacion', component: AfiliacionComponent, pathMatch: 'full'},
            { path: 'pedidos', component: PedidosComponent, pathMatch: 'full'},
            { path: 'productos', component: ProductosComponent, pathMatch: 'full'},
            { path: 'administrador', component: AdministradorComponent, pathMatch: 'full'}
        ]
    },
    { path: '**', redirectTo: '/login' }
];