import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AdminService } from '../../Services/Admin/admin.service';

export const authenticationAdminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  const currentAdmin = adminService.currentAdminValue;
  if (currentAdmin) {
    return true;
  } else{
    return router.createUrlTree(['/login']); // Redirige a login si no está autenticado
  }
};
