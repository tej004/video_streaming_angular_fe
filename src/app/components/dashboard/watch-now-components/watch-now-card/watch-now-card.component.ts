import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Video } from '../../../../models/video.model';
import { UserVideosService } from '../../../../services/user-videos.service';

@Component({
  selector: 'app-watch-now-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './watch-now-card.component.html',
  styleUrls: ['./watch-now-card.component.css'],
})
export class WatchNowCardComponent {
  @Input() video!: Video;
  @Input() selectedVideoId!: number | null;
  @Input() selectionDescription: string = 'Currently Playing';

  isConfirmationModalOpen = false;

  constructor(private userVideosService: UserVideosService) {}

  getFormattedGenre(genre: string | null): string {
    if (!genre) {
      return 'N/A';
    }
    return genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  }

  openConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
  }

  confirmDelete(): void {
    this.userVideosService.deleteVideo(this.video.id).subscribe({
      next: () => {
        this.closeConfirmationModal();
        this.userVideosService.getAllVideos();
      },
      error: (err) => {},
    });
  }
}
