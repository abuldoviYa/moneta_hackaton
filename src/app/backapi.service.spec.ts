import { TestBed } from '@angular/core/testing';

import { BackapiService } from './backapi.service';

describe('BackapiService', () => {
  let service: BackapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
