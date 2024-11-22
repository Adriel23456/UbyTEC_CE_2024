import { TestBed } from '@angular/core/testing';

import { MongoDbApiService } from './mongo-db-api.service';

describe('MongoDbApiService', () => {
  let service: MongoDbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoDbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
