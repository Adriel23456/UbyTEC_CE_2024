import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticationClientGuard } from './authentication-client.guard';

describe('authenticationClientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticationClientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
