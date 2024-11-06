import { CanActivateFn } from '@angular/router';

export const authenticationAdminGuard: CanActivateFn = (route, state) => {
  return true;
};
