import { TestBed } from '@angular/core/testing';

import { PortFolioService } from './portfolio.service';

describe('PortFolioService', () => {
  let service: PortFolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortFolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
