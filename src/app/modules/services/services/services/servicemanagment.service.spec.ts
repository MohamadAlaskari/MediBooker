import { TestBed } from '@angular/core/testing';

import { ServicemanagmentService } from './servicemanagment.service';

describe('ServicemanagmentService', () => {
  let service: ServicemanagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicemanagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
