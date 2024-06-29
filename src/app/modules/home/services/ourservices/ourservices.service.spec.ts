import { TestBed } from '@angular/core/testing';

import { OurservicesService } from './ourservices.service';

describe('OurservicesService', () => {
  let service: OurservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
