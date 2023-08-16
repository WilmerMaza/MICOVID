/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntrenadorServicesService } from './EntrenadorServices.service';

describe('Service: EntrenadorServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrenadorServicesService]
    });
  });

  it('should ...', inject([EntrenadorServicesService], (service: EntrenadorServicesService) => {
    expect(service).toBeTruthy();
  }));
});
