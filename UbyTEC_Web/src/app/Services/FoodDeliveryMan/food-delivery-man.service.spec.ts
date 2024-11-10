import { TestBed } from '@angular/core/testing';

import { FoodDeliveryManService } from './food-delivery-man.service';

describe('FoodDeliveryManService', () => {
  let service: FoodDeliveryManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDeliveryManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
