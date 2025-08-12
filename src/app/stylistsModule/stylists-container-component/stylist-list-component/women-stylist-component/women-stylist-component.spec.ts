import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenStylistComponent } from './women-stylist-component';

describe('WomenStylistComponent', () => {
  let component: WomenStylistComponent;
  let fixture: ComponentFixture<WomenStylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenStylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenStylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
