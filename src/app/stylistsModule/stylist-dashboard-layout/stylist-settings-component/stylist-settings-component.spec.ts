import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistSettingsComponent } from './stylist-settings-component';

describe('StylistSettingsComponent', () => {
  let component: StylistSettingsComponent;
  let fixture: ComponentFixture<StylistSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
