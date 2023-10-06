import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubgrupoComponent } from './create-subgrupo.component';

describe('CreateSubgrupoComponent', () => {
  let component: CreateSubgrupoComponent;
  let fixture: ComponentFixture<CreateSubgrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubgrupoComponent]
    });
    fixture = TestBed.createComponent(CreateSubgrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
