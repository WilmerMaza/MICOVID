import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSportsmanComponent } from './create-sportsman.component';

describe('CreateSportsmanComponent', () => {
  let component: CreateSportsmanComponent;
  let fixture: ComponentFixture<CreateSportsmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSportsmanComponent]
    });
    fixture = TestBed.createComponent(CreateSportsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
