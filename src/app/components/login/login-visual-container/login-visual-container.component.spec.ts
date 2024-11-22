import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVisualContainerComponent } from './login-visual-container.component';

describe('LoginVisualContainerComponent', () => {
  let component: LoginVisualContainerComponent;
  let fixture: ComponentFixture<LoginVisualContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVisualContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginVisualContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
