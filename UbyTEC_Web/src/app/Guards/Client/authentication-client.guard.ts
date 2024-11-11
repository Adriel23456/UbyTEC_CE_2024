import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ClientService } from '../../Services/Client/client.service';

export const authenticationClientGuard: CanActivateFn = (route, state) => {
  const clientService = inject(ClientService);
  const router = inject(Router);
  const currentClient = clientService.currentClientValue;
  if (currentClient) {
    return true;
  } else{
    return router.createUrlTree(['/login']); // Redirige a login si no está autenticado
  }
};
