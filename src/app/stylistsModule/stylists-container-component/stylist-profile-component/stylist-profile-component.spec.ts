import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistProfileComponent } from './stylist-profile-component';

describe('StylistProfileComponent', () => {
  let component: StylistProfileComponent;
  let fixture: ComponentFixture<StylistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
