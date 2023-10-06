import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEjercicioComponent } from './create-ejercicio.component';

describe('CreateEjercicioComponent', () => {
  let component: CreateEjercicioComponent;
  let fixture: ComponentFixture<CreateEjercicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEjercicioComponent]
    });
    fixture = TestBed.createComponent(CreateEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
