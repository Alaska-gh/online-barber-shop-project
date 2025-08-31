import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistCustomersComponent } from './stylist-customers-component';

describe('StylistCustomersComponent', () => {
  let component: StylistCustomersComponent;
  let fixture: ComponentFixture<StylistCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
