import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { describe, beforeEach, it } from 'node:test';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
