import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVideosContainerComponent } from './your-videos-container.component';

describe('YourVideosContainerComponent', () => {
  let component: YourVideosContainerComponent;
  let fixture: ComponentFixture<YourVideosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourVideosContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourVideosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
