import { TestBed } from '@angular/core/testing';

import { ImagenFuntionsService } from './imagen-funtions.service';

describe('ImagenFuntionsService', () => {
  let service: ImagenFuntionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenFuntionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
