import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchNowCardComponent } from './watch-now-card.component';

describe('WatchNowCardComponent', () => {
  let component: WatchNowCardComponent;
  let fixture: ComponentFixture<WatchNowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchNowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchNowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
