import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { BusinessAssociateService } from '../../Services/BusinessAssociate/business-associate.service';
import { BusinessManagerService } from '../../Services/BusinessManager/business-manager.service';

export const authenticationBusinessGuard: CanActivateFn = (route, state) => {
  const businessAssociateService = inject(BusinessAssociateService);
  const businessManagerService = inject(BusinessManagerService);
  const router = inject(Router);
  const currentBusinessAssociate = businessAssociateService.currentBusinessAssociateValue;
  const currentBusinessManager = businessManagerService.currentBusinessManagerValue;
  if (currentBusinessAssociate && currentBusinessManager) {
    return true;
  } else{
    return router.createUrlTree(['/login']); // Redirige a login si no está autenticado
  }
};
