import { CanActivateFn } from '@angular/router';

export const authenticationBusinessGuard: CanActivateFn = (route, state) => {
  return true;
};
