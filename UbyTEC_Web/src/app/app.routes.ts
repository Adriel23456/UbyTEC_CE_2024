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
import { AdminManagementComponent } from './Components/AdminView/admin-management/admin-management.component';
import { BusinessAssociateManagementComponent } from './Components/AdminView/business-associate-management/business-associate-management.component';
import { BusinessManagerManagementComponent } from './Components/AdminView/business-manager-management/business-manager-management.component';
import { BusinessTypeManagementComponent } from './Components/AdminView/business-type-management/business-type-management.component';
import { ClientsManagementComponent } from './Components/AdminView/clients-management/clients-management.component';
import { FoodDeliveryManManagementComponent } from './Components/AdminView/food-delivery-man-management/food-delivery-man-management.component';
import { ReportsComponent } from './Components/AdminView/reports/reports.component';
import { ManagementOrdersComponent } from './Components/BusinessManagerView/management-orders/management-orders.component';
import { ManagementProductsComponent } from './Components/BusinessManagerView/management-products/management-products.component';
import { OrderAssignComponent } from './Components/BusinessManagerView/order-assign/order-assign.component';
import { CartsComponent } from './Components/ClientView/carts/carts.component';
import { InitialComponent } from './Components/ClientView/initial/initial.component';
import { ManagementComponent } from './Components/ClientView/management/management.component';
import { OrderReceptionComponent } from './Components/ClientView/order-reception/order-reception.component';
import { ModifyStateComponent } from './Components/FoodDeliveryManView/modify-state/modify-state.component';
import { CreateNewClientLoginComponent } from './Components/Login/create-new-client-login/create-new-client-login.component';
import { CreateNewAffiliateLoginComponent } from './Components/Login/create-new-affiliate-login/create-new-affiliate-login.component';
import { CreateNewFooddeliverymanLoginComponent } from './Components/Login/create-new-fooddeliveryman-login/create-new-fooddeliveryman-login.component';
import { CreateNewBusinessAssociateComponent } from './Components/Login/create-new-business-associate/create-new-business-associate.component';
import { ShopInBusinessComponent } from './Components/ClientView/shop-in-business/shop-in-business.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'loginCreateNewClient', component: CreateNewClientLoginComponent },
    { path: 'loginCreateNewAffiliate', component: CreateNewAffiliateLoginComponent },
    { path: 'loginCreateNewFoodDeliveryMan', component: CreateNewFooddeliverymanLoginComponent },
    { path: 'loginCreateNewBusiness', component: CreateNewBusinessAssociateComponent },
    {
      path: 'sidenavClient',
      component: SidenavClientComponent,
      canActivate: [authenticationClientGuard],
      children: [
        { path: '', redirectTo: 'initial', pathMatch: 'full' },
        { path: 'carts', component: CartsComponent },
        { path: 'initial', component: InitialComponent },
        { path: 'management', component: ManagementComponent },
        { path: 'orderReception', component: OrderReceptionComponent },
        { path: 'shop-in-busines/:id', component: ShopInBusinessComponent}
      ]
    },
    {
      path: 'sidenavAdmin',
      component: SidenavAdminComponent,
      canActivate: [authenticationAdminGuard],
      children: [
        { path: '', redirectTo: 'adminManagement', pathMatch: 'full' },
        { path: 'adminManagement', component: AdminManagementComponent },
        { path: 'businessAssociateManagement', component: BusinessAssociateManagementComponent },
        { path: 'businessManagerManagement', component: BusinessManagerManagementComponent },
        { path: 'businessTypeManagement', component: BusinessTypeManagementComponent },
        { path: 'clientsManagement', component: ClientsManagementComponent },
        { path: 'foodDeliveryManManagement', component: FoodDeliveryManManagementComponent },
        { path: 'reports', component: ReportsComponent }
      ]
    },
    {
      path: 'sidenavBusiness',
      component: SidenavBusinessManagerComponent,
      canActivate: [authenticationBusinessGuard],
      children: [
        { path: '', redirectTo: 'managementOrders', pathMatch: 'full' },
        { path: 'managementOrders', component: ManagementOrdersComponent },
        { path: 'managementProducts', component: ManagementProductsComponent },
        { path: 'orderAssign', component: OrderAssignComponent }
      ]
    },
    {
      path: 'sidenavFoodDeliveryMan',
      component: SidenavFoodDeliveryManComponent,
      canActivate: [authenticationFoodDeliveryManGuard],
      children: [
        { path: '', redirectTo: 'modifyState', pathMatch: 'full' },
        { path: 'modifyState', component: ModifyStateComponent }
      ]
    },
    { path: '**', redirectTo: '/login' }
];