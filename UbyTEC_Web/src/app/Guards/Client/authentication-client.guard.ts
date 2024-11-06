import { CanActivateFn } from '@angular/router';

export const authenticationClientGuard: CanActivateFn = (route, state) => {
  return true;
};
