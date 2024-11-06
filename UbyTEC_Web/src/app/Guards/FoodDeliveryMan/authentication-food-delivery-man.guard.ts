import { CanActivateFn } from '@angular/router';

export const authenticationFoodDeliveryManGuard: CanActivateFn = (route, state) => {
  return true;
};
