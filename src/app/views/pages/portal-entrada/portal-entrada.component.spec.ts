import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalEntradaComponent } from './portal-entrada.component';

describe('PortalEntradaComponent', () => {
  let component: PortalEntradaComponent;
  let fixture: ComponentFixture<PortalEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalEntradaComponent]
    });
    fixture = TestBed.createComponent(PortalEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
