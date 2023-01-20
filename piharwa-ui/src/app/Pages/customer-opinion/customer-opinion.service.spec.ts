import { TestBed } from '@angular/core/testing';

import { TestimonialService } from './customer-opinion.service';

describe('ProductService', () => {
  let service: TestimonialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
