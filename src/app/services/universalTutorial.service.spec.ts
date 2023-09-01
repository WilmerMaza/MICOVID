/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UniversalTutorialService } from './universalTutorial.service';

describe('Service: UniversalTutorial', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversalTutorialService]
    });
  });

  it('should ...', inject([UniversalTutorialService], (service: UniversalTutorialService) => {
    expect(service).toBeTruthy();
  }));
});
