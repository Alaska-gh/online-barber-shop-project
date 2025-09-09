import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLoader } from './signup-loader';

describe('SignupLoader', () => {
  let component: SignupLoader;
  let fixture: ComponentFixture<SignupLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
