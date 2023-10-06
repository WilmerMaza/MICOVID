import { TestBed } from '@angular/core/testing';

import { EjercicioServices } from './ejercicioServices.service';

describe('EjercicioSevicesService', () => {
  let service: EjercicioServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
