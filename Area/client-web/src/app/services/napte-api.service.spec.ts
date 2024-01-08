import { TestBed } from '@angular/core/testing';

import { NapteApiService } from './napte-api.service';

describe('NapteApiService', () => {
  let service: NapteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NapteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
