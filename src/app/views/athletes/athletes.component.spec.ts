import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletesComponent } from './athletes.component';

describe('AthletesComponent', () => {
  let component: AthletesComponent;
  let fixture: ComponentFixture<AthletesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthletesComponent]
    });
    fixture = TestBed.createComponent(AthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
