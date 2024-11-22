import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-video-creation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './video-creation-modal.component.html',
  styleUrls: ['./video-creation-modal.component.css'],
})
export class VideoCreationModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<{
    title: string;
    description: string;
    videoFile: File | null;
  }>();

  applyForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    video_file_object: new FormControl<File | null>(null, [
      Validators.required,
    ]),
    thumbnail_file_object: new FormControl<File | null>(null, [
      Validators.required,
    ]),
  });

  videoPreviewUrl: string | null = null;
  thumbnailPreviewUrl: string | null = null;

  close() {
    this.applyForm.patchValue({ video_file_object: null });
    this.videoPreviewUrl = null;
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.applyForm.valid) {
      this.submitForm.emit(
        this.applyForm.value as {
          title: string;
          description: string;
          videoFile: File | null;
        }
      );
      this.close();
    } else {
      this.applyForm.markAllAsTouched();
    }
  }

  onVideoFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type.startsWith('video/')) {
        this.applyForm.patchValue({ video_file_object: file });

        this.videoPreviewUrl = URL.createObjectURL(file);
      } else {
        this.applyForm.patchValue({ video_file_object: null });
        this.videoPreviewUrl = null;
        alert('Please select a valid video file.');
      }
    }
  }

  onThumbnailFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        this.applyForm.patchValue({ thumbnail_file_object: file });
        this.thumbnailPreviewUrl = URL.createObjectURL(file);
      } else {
        this.applyForm.patchValue({ thumbnail_file_object: null });
        this.thumbnailPreviewUrl = null;
        alert('Please select a valid image file.');
      }
    }
  }
}
