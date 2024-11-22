import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryVideoFormComponent } from './library-video-form.component';

describe('LibraryVideoFormComponent', () => {
  let component: LibraryVideoFormComponent;
  let fixture: ComponentFixture<LibraryVideoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryVideoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
