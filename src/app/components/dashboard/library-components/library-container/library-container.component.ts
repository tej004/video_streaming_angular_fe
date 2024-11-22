import { Component, OnInit } from '@angular/core';
import { LibraryVideoFormComponent } from '../library-video-form/library-video-form.component';
import { CommonModule } from '@angular/common';
import { UserVideosService } from '../../../../services/user-videos.service';
import { Video } from '../../../../models/video.model';
import { WatchNowCardComponent } from '../../watch-now-components/watch-now-card/watch-now-card.component';
import { FormsModule } from '@angular/forms';
import { LibraryUpdateFormComponent } from '../library-update-form/library-update-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-container',
  imports: [
    CommonModule,
    LibraryVideoFormComponent,
    LibraryUpdateFormComponent,
    FormsModule,
    WatchNowCardComponent,
  ],
  templateUrl: './library-container.component.html',
  styleUrl: './library-container.component.css',
})
export class LibraryContainerComponent implements OnInit {
  isFormOpen = false;
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  searchTerm: string = '';
  selectedVideoId: number | null = null;
  selectedVideoDetails: Video | null = null;


  constructor(
    private userVideosService: UserVideosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userVideosService.videos$.subscribe((data) => {
      this.videos = data;
      this.filteredVideos = data;

      const findVid = this.videos.find((video: Video) => {
        if (video.id === this.selectedVideoId) {
          this.selectedVideoDetails = video;
          return video;
        }
        return null;
      });

      if (!findVid) {
        this.selectedVideoId = this.videos[0].id;
        this.selectedVideoDetails = this.videos[0];
      }
    });

    this.userVideosService.getAllVideos().subscribe();
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  filterVideos(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredVideos = this.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTermLower) ||
        video.description.toLowerCase().includes(searchTermLower) ||
        (video.genre && video.genre.toLowerCase().includes(searchTermLower))
    );
  }

  selectVideo(event: Event, video: Video): void {
    event.stopPropagation();
    this.selectedVideoId = video.id;
    this.selectedVideoDetails = video;

    this.router.navigate([], {
      queryParams: { selectedVideoId: video.id },
      queryParamsHandling: 'merge',
    });
  }
}
