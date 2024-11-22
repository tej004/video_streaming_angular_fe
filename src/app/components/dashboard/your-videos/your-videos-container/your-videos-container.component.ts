import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../../common/carousel/carousel.component';
import { UserVideosService } from '../../../../services/user-videos.service';

interface Video {
  id: number;
  thumbnail: string;
}

@Component({
  selector: 'app-your-videos-container',
  imports: [CommonModule, CarouselComponent],
  templateUrl: './your-videos-container.component.html',
  styleUrls: ['./your-videos-container.component.css'],
})
export class YourVideosContainerComponent implements OnInit {
  currentSlide: number = 0;
  data: { [key: string]: Video[] } = {};

  constructor(private userVideosService: UserVideosService) {}

  ngOnInit(): void {
    this.userVideosService.getAllVideosByGenre().subscribe({
      next: (data: any) => {
        this.data = data;
      },
      error: (error: any) => {
        console.error('Error fetching videos', error);
      },
    });
  }

  hasData(): boolean {
    return Object.keys(this.data).length > 0;
  }
}
