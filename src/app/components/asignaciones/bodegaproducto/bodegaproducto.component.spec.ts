import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaproductoComponent } from './bodegaproducto.component';

describe('BodegaproductoComponent', () => {
  let component: BodegaproductoComponent;
  let fixture: ComponentFixture<BodegaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodegaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
