import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistScheduleComponent } from './stylist-schedule-component';

describe('StylistScheduleComponent', () => {
  let component: StylistScheduleComponent;
  let fixture: ComponentFixture<StylistScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
