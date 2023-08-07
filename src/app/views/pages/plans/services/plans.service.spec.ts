/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlansService } from './plans.service';

describe('Service: Plans', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlansService]
    });
  });

  it('should ...', inject([PlansService], (service: PlansService) => {
    expect(service).toBeTruthy();
  }));
});
