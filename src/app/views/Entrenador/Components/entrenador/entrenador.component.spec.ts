import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadorComponent } from './entrenador.component';

describe('EntrenadorComponent', () => {
  let component: EntrenadorComponent;
  let fixture: ComponentFixture<EntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrenadorComponent]
    });
    fixture = TestBed.createComponent(EntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
