import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchNowCardComponent } from '../watch-now-card/watch-now-card.component';
import { Video } from '../../../../models/video.model';
import { UserVideosService } from '../../../../services/user-videos.service';

@Component({
  selector: 'app-watch-now',
  templateUrl: './watch-now.component.html',
  imports: [CommonModule, FormsModule, WatchNowCardComponent],
  styleUrls: ['./watch-now.component.css'],
})
export class WatchNowComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  isLoading = true;
  error: string | null = null;
  selectedVideoId: number | null = null;
  selectedVideo: Video | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  searchTerm: string = '';

  constructor(
    private userVideosService: UserVideosService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userVideosService.getAllVideos().subscribe({
      next: (data: Video[]) => {
        console.log('Fetched videos:', data); // Add logging
        this.videos = data;
        this.filteredVideos = data;
        this.isLoading = false;

        // Check for selectedVideoId in query params
        this.route.queryParams.subscribe((params) => {
          const selectedVideoId = params['selectedVideoId'];
          if (selectedVideoId) {
            const video = this.videos.find(
              (video) => video.id === +selectedVideoId
            );
            if (video) {
              this.selectVideo(video.id);
            } else {
              this.selectVideo(this.videos[0].id);
            }
          } else {
            this.selectVideo(this.videos[0].id);
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching videos', error);
        this.error = 'Error fetching videos';
        this.isLoading = false;
      },
      complete: () => {
        console.log('Video fetching completed');
      },
    });

    console.log('HUMANA INITIALIZED');
  }

  ngOnDestroy(): void {
    // Remove selectedVideoId from query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { selectedVideoId: null },
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
  }

  selectVideo(videoId: number): void {
    this.selectedVideoId = videoId;
    this.selectedVideo =
      this.videos.find((video) => video.id === videoId) || null;
    if (this.selectedVideo) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.selectedVideo.video_file
      );
    }
  }

  ngOnChanges(): void {
    this.filterVideos();
  }

  filterVideos(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredVideos = this.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTermLower) ||
        video.description.toLowerCase().includes(searchTermLower) ||
        (video.genre && video.genre.toLowerCase().includes(searchTermLower))
    );

    // Ensure the selected video is the first in the filtered list
    if (this.selectedVideo) {
      const index = this.filteredVideos.findIndex(
        (video) => video.id === this.selectedVideoId
      );
      if (index > -1) {
        this.filteredVideos.splice(index, 1);
        this.filteredVideos.unshift(this.selectedVideo);
      }
    }
  }

  getFormattedGenre(genre: string | null): string {
    if (!genre) {
      return 'N/A';
    }
    return genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  }
}
