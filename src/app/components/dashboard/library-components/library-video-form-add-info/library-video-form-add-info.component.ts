import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GENRE_CHOICES } from '../../../../models/video.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library-video-form-add-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './library-video-form-add-info.component.html',
  styleUrls: ['./library-video-form-add-info.component.css'],
})
export class LibraryVideoFormAddInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() genre: string = 'ACTION';
  @Output() onInputChange = new EventEmitter<any>();

  genres = GENRE_CHOICES;
}