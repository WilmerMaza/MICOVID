/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TareasxmicroComponent } from './tareasxmicro.component';

describe('TareasxmicroComponent', () => {
  let component: TareasxmicroComponent;
  let fixture: ComponentFixture<TareasxmicroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasxmicroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasxmicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
