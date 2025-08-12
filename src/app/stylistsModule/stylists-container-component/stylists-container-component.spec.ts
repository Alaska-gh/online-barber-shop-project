import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistsContainerComponent } from './stylists-container-component';

describe('StylistsContainerComponent', () => {
  let component: StylistsContainerComponent;
  let fixture: ComponentFixture<StylistsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
