import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-library-video-form-thumbnail',
  templateUrl: './library-video-form-thumbnail.component.html',
  styleUrls: ['./library-video-form-thumbnail.component.css'],
})
export class LibraryVideoFormThumbnailComponent {
  @Input() thumbnailUrl: string | null = null;
  @Output() thumbnailChanged = new EventEmitter<Event>();

  onThumbnailChanged(event: Event): void {
    this.thumbnailChanged.emit(event);
  }
}
