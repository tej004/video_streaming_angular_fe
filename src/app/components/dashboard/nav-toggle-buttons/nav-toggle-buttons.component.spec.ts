import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavToggleButtonsComponent } from './nav-toggle-buttons.component';

describe('NavToggleButtonsComponent', () => {
  let component: NavToggleButtonsComponent;
  let fixture: ComponentFixture<NavToggleButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavToggleButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavToggleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
