import { TestBed } from '@angular/core/testing';

import { ListAddressService } from './list-address.service';

describe('ListAddressService', () => {
  let service: ListAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
