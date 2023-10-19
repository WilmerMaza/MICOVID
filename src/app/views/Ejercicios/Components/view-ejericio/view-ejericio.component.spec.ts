import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEjericioComponent } from './view-ejericio.component';

describe('ViewEjericioComponent', () => {
  let component: ViewEjericioComponent;
  let fixture: ComponentFixture<ViewEjericioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEjericioComponent]
    });
    fixture = TestBed.createComponent(ViewEjericioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
