import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistReviewsComponent } from './stylist-reviews-component';

describe('StylistReviewsComponent', () => {
  let component: StylistReviewsComponent;
  let fixture: ComponentFixture<StylistReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
