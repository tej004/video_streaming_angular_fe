import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryVideoFormVideoContainerComponent } from './library-video-form-video-container.component';

describe('LibraryVideoFormVideoContainerComponent', () => {
  let component: LibraryVideoFormVideoContainerComponent;
  let fixture: ComponentFixture<LibraryVideoFormVideoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryVideoFormVideoContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryVideoFormVideoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
