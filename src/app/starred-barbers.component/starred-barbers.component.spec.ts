import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredBarbersComponent } from './starred-barbers.component';

describe('StarredBarbersComponent', () => {
  let component: StarredBarbersComponent;
  let fixture: ComponentFixture<StarredBarbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarredBarbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarredBarbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
