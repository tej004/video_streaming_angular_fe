import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-library-video-form-video-container',
  imports: [],
  templateUrl: './library-video-form-video-container.component.html',
  styleUrl: './library-video-form-video-container.component.css',
})
export class LibraryVideoFormVideoContainerComponent {
  @Input() videoUrl!: string | null;
  @Output() videoUrlChanged = new EventEmitter<any>();

  handleVideoUrlChange(event: any): void {
    this.videoUrlChanged.emit(event);
    this.videoUrl = URL.createObjectURL(event.target.files[0]);
  }
}
