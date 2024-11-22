import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryVideoFormAddInfoComponent } from './library-video-form-add-info.component';

describe('LibraryVideoFormAddInfoComponent', () => {
  let component: LibraryVideoFormAddInfoComponent;
  let fixture: ComponentFixture<LibraryVideoFormAddInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryVideoFormAddInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryVideoFormAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
