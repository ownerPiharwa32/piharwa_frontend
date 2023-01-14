import { TestBed } from '@angular/core/testing';

import { LatestArrivalService } from './latest-arrival.service';

describe('ProductService', () => {
  let service: LatestArrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestArrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
