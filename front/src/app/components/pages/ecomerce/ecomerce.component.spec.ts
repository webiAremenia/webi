import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomerceComponent } from './ecomerce.component';

describe('EcomerceComponent', () => {
  let component: EcomerceComponent;
  let fixture: ComponentFixture<EcomerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
