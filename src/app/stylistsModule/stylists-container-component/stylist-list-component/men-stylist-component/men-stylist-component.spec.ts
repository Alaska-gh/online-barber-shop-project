import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenStylistComponent } from './men-stylist-component';

describe('MenStylistComponent', () => {
  let component: MenStylistComponent;
  let fixture: ComponentFixture<MenStylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenStylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenStylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
