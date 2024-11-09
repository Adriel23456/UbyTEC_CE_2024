import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { authenticationClientGuard } from './Guards/Client/authentication-client.guard';
import { SidenavClientComponent } from './Components/ClientView/sidenav-client/sidenav-client.component';

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
    { path: '**', redirectTo: '/login' }
];