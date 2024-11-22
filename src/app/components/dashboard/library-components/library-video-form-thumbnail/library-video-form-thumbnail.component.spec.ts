import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryVideoFormThumbnailComponent } from './library-video-form-thumbnail.component';

describe('LibraryVideoFormThumbnailComponent', () => {
  let component: LibraryVideoFormThumbnailComponent;
  let fixture: ComponentFixture<LibraryVideoFormThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryVideoFormThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryVideoFormThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
