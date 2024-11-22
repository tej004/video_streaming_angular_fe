import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCreationModalComponent } from './video-creation-modal.component';

describe('VideoCreationModalComponent', () => {
  let component: VideoCreationModalComponent;
  let fixture: ComponentFixture<VideoCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCreationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
