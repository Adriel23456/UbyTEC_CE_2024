import { TestBed } from '@angular/core/testing';

import { ProofOfPaymentService } from './proof-of-payment.service';

describe('ProofOfPaymentService', () => {
  let service: ProofOfPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofOfPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
