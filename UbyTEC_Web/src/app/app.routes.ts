import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { authenticationClientGuard } from './Guards/Client/authentication-client.guard';
import { SidenavClientComponent } from './Components/ClientView/sidenav-client/sidenav-client.component';
import { SidenavAdminComponent } from './Components/AdminView/sidenav-admin/sidenav-admin.component';
import { authenticationAdminGuard } from './Guards/Admin/authentication-admin.guard';
import { SidenavFoodDeliveryManComponent } from './Components/FoodDeliveryManView/sidenav-food-delivery-man/sidenav-food-delivery-man.component';
import { authenticationFoodDeliveryManGuard } from './Guards/FoodDeliveryMan/authentication-food-delivery-man.guard';
import { SidenavBusinessManagerComponent } from './Components/BusinessManagerView/sidenav-business-manager/sidenav-business-manager.component';
import { authenticationBusinessGuard } from './Guards/Business/authentication-business.guard';

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
    {
      path: 'sidenavAdmin',
      component: SidenavAdminComponent,
      canActivate: [authenticationAdminGuard],
      children: [
        { path: '', redirectTo: 'start', pathMatch: 'full' },
        //{ path: 'startInfoClient', component: StartInfoClientComponent }
      ]
    },
    {
      path: 'sidenavBusiness',
      component: SidenavBusinessManagerComponent,
      canActivate: [authenticationBusinessGuard],
      children: [
        { path: '', redirectTo: 'start', pathMatch: 'full' },
        //{ path: 'startInfoClient', component: StartInfoClientComponent }
      ]
    },
    {
      path: 'sidenavFoodDeliveryMan',
      component: SidenavFoodDeliveryManComponent,
      canActivate: [authenticationFoodDeliveryManGuard],
      children: [
        { path: '', redirectTo: 'start', pathMatch: 'full' },
        //{ path: 'startInfoClient', component: StartInfoClientComponent }
      ]
    },
    { path: '**', redirectTo: '/login' }
];