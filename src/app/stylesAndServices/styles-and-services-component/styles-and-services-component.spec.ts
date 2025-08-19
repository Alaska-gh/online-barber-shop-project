import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesAndServicesComponent } from './styles-and-services-component';

describe('StylesAndServicesComponent', () => {
  let component: StylesAndServicesComponent;
  let fixture: ComponentFixture<StylesAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylesAndServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylesAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
