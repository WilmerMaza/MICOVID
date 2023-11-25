/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComplementosService } from './complementos.service';

describe('Service: Complementos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplementosService]
    });
  });

  it('should ...', inject([ComplementosService], (service: ComplementosService) => {
    expect(service).toBeTruthy();
  }));
});
