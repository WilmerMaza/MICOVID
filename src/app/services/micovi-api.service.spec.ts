import { TestBed } from '@angular/core/testing';

import { MicoviApiService } from './micovi-api.service';

describe('MicoviApiService', () => {
  let service: MicoviApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicoviApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
