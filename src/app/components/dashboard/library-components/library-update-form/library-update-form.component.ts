import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibraryVideoFormThumbnailComponent } from '../library-video-form-thumbnail/library-video-form-thumbnail.component';
import {
  IVideoCreation,
  IVideoFormUpdate,
  Video,
} from '../../../../models/video.model';
import { LibraryVideoFormVideoContainerComponent } from '../library-video-form-video-container/library-video-form-video-container.component';
import { LibraryVideoFormAddInfoComponent } from '../library-video-form-add-info/library-video-form-add-info.component';
import { UserVideosService } from '../../../../services/user-videos.service';

@Component({
  selector: 'app-library-update-form',
  imports: [
    CommonModule,
    FormsModule,
    LibraryVideoFormThumbnailComponent,
    LibraryVideoFormVideoContainerComponent,
    LibraryVideoFormAddInfoComponent,
  ],
  templateUrl: './library-update-form.component.html',
  styleUrls: ['./library-update-form.component.css'],
})
export class LibraryUpdateFormComponent implements OnInit {
  @Input() selectedVideo: Video | null = null;

  thumbnailUrl: string | null = null;
  thumbnail_file_object: File | null = null;
  videoUrl: string | null = null;
  video_file_object: File | null = null;
  title: string = '';
  description: string = '';
  genre: string = '';
  isConfirmationModalOpen = false;
  isLoading = false;

  formData: IVideoFormUpdate | null = null;

  constructor(private userVideosService: UserVideosService) {}

  ngOnInit(): void {
    this.updateFormFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVideo']) {
      this.updateFormFields();
    }
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
  }

  updateFormFields(): void {
    if (this.selectedVideo) {
      this.thumbnailUrl = this.selectedVideo.thumbnail;
      this.videoUrl = this.selectedVideo.video_file;
      this.title = this.selectedVideo.title;
      this.description = this.selectedVideo.description;
      this.genre = this.selectedVideo.genre || '';
    }
  }

  onThumbnailChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.thumbnail_file_object = file;
        this.thumbnailUrl = URL.createObjectURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  }

  onVideoChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('nisud ko1');

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('nisud ko2');

      if (file.type.startsWith('video/')) {
        console.log('nisud ko3');
        this.video_file_object = file;
        this.videoUrl = URL.createObjectURL(file);
        console.log(this.videoUrl);
      } else {
        alert('Please select a valid video file.');
      }
    }
  }

  onAdditionInfoChanged(data: any): void {
    // Update the corresponding property based on the input id
    if (data.id === 'title') {
      this.title = data.value;
    } else if (data.id === 'description') {
      this.description = data.value;
    } else if (data.id === 'genre') {
      this.genre = data.value;
    }
  }

  onApplyChanges(): void {
    this.isLoading = true;
    if (
      this.selectedVideo?.id === null ||
      this.selectedVideo?.id === undefined
    ) {
      alert('Invalid video id.');
      return;
    }

    this.formData = {
      id: this.selectedVideo?.id || 0,
      title: this.title,
      description: this.description,
      genre: this.genre,
    };

    if (
      this.thumbnail_file_object &&
      this.thumbnail_file_object instanceof File
    ) {
      this.formData.thumbnail_file_object = this.thumbnail_file_object;
    }

    if (this.video_file_object && this.video_file_object instanceof File) {
      this.formData.video_file_object = this.video_file_object;
    }

    this.userVideosService.updateVideo(this.formData).subscribe({
      next: () => {
        this.userVideosService.getAllVideos();
        this.isConfirmationModalOpen = false;
        this.isLoading = false;
      },
      error: (err) => {},
    });
  }

  onOpenConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }
}
