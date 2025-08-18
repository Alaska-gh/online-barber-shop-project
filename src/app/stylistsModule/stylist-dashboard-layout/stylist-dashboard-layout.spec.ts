import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistDashboardLayout } from './stylist-dashboard-layout';

describe('StylistDashboardLayout', () => {
  let component: StylistDashboardLayout;
  let fixture: ComponentFixture<StylistDashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistDashboardLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistDashboardLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
