import { TestBed } from '@angular/core/testing';

import { GorillazServiceService } from './gorillaz-service.service';

describe('GorillazServiceService', () => {
  let service: GorillazServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GorillazServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
