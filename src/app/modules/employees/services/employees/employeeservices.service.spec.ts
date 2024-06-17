import { TestBed } from '@angular/core/testing';

import { Employeeservice } from './employeeservices.service';

describe('Employeeservice', () => {
  let service: Employeeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employeeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
