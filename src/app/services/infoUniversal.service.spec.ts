/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfoUniversalService } from './infoUniversal.service';

describe('Service: InfoUniversal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoUniversalService]
    });
  });

  it('should ...', inject([InfoUniversalService], (service: InfoUniversalService) => {
    expect(service).toBeTruthy();
  }));
});
