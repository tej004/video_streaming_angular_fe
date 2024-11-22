import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUpdateFormComponent } from './library-update-form.component';

describe('LibraryUpdateFormComponent', () => {
  let component: LibraryUpdateFormComponent;
  let fixture: ComponentFixture<LibraryUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
