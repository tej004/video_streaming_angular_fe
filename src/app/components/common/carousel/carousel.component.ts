import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @Input() slides: Array<{ id: number; thumbnail: string }> = [];
  @Input() genre: string = 'N/A';

  currentSlide = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  get totalSlots(): number {
    return Math.ceil(this.slides.length / 5);
  }

  get emptySlots(): number {
    if (this.slides.length === 0) {
      return 5; // or any other logic you want to apply when slides are empty
    }
    const remainder: number = this.slides.length % 5;
    return remainder === 0 ? 0 : 5 - remainder;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlots;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlots) % this.totalSlots;
  }

  updateQueryParam(params: { [key: string]: string }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // merge with existing query params
    });
  }

  onImageClick(selectedId: number) {
    this.updateQueryParam({
      toggle: 'watch_now',
      selectedVideoId: selectedId.toString(),
    });
  }
}
