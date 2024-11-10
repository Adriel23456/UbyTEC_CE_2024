import { TestBed } from '@angular/core/testing';

import { BusinessAssociateService } from './business-associate.service';

describe('BusinessAssociateService', () => {
  let service: BusinessAssociateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAssociateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
