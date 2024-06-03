import { TestBed } from '@angular/core/testing';

import { MainHeaderService } from './main-header.service';

describe('MainHeaderService', () => {
  let service: MainHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
