import { TestBed } from '@angular/core/testing';

import { MsuAuthService } from './msu-auth.service';

describe('MsuAuthService', () => {
  let service: MsuAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsuAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
