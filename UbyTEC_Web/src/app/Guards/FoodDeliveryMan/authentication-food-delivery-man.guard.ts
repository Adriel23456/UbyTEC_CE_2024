import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { FoodDeliveryManService } from '../../Services/FoodDeliveryMan/food-delivery-man.service';

export const authenticationFoodDeliveryManGuard: CanActivateFn = (route, state) => {
  const foodDeliveryManService = inject(FoodDeliveryManService);
  const router = inject(Router);
  const currentFoodDeliveryMan = foodDeliveryManService.currentDeliveryManValue;
  if (currentFoodDeliveryMan) {
    return true;
  } else{
    return router.createUrlTree(['/login']); // Redirige a login si no está autenticado
  }
};
