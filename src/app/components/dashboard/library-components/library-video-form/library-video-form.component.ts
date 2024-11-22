import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GENRE_CHOICES, IVideoCreation } from '../../../../models/video.model';
import { UserVideosService } from '../../../../services/user-videos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library-video-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './library-video-form.component.html',
  styleUrls: ['./library-video-form.component.css'],
})
export class LibraryVideoFormComponent {
  videoForm: FormGroup;
  genres = GENRE_CHOICES;
  videoId: number | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  thumbnailPreview: string | ArrayBuffer | null = null;
  currentStep = 1;
  @Input() isModalOpen = true;
  @Output() handleToggleModal = new EventEmitter<void>();
  submissionError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private videoService: UserVideosService
  ) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      video_file_object: [null, Validators.required],
      thumbnail_file_object: [null, Validators.required],
      genre: ['', Validators.required],
    });
  }

  onFileChange(event: any, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.videoForm.patchValue({
        [field]: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'video_file_object') {
          this.videoPreview = reader.result;
        } else if (field === 'thumbnail_file_object') {
          this.thumbnailPreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  nextStep(): void {
    if (
      this.currentStep === 1 &&
      this.videoForm.get('title')?.valid &&
      this.videoForm.get('description')?.valid &&
      this.videoForm.get('video_file_object')?.valid
    ) {
      this.currentStep++;
    } else if (
      this.currentStep === 2 &&
      this.videoForm.get('thumbnail_file_object')?.valid &&
      this.videoForm.get('genre')?.valid
    ) {
      this.currentStep++;
    } else {
      this.videoForm.markAllAsTouched();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStep(step: number): void {
    this.currentStep = step;
  }

  closeModal(): void {
    this.handleToggleModal.emit();
  }

  onSubmit(): void {
    if (this.videoForm.valid) {
      this.isLoading = true;
      const video: IVideoCreation = this.videoForm.value;
      this.videoService.createVideo(video).subscribe({
        next: () => {
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          this.submissionError =
            'An error occurred while submitting the form. Please try again.';
        },
      });
    } else {
      this.videoForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }
}
