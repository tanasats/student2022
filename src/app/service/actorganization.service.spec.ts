import { TestBed } from '@angular/core/testing';

import { ActorganizationService } from './actorganization.service';

describe('ActorganizationService', () => {
  let service: ActorganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
