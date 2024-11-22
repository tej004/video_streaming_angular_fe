import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-toggle-buttons',
  imports: [CommonModule],
  templateUrl: './nav-toggle-buttons.component.html',
  styleUrls: ['./nav-toggle-buttons.component.css'],
})
export class NavToggleButtonsComponent {
  @Input() selectedButton: string = 'genres';
  @Output() buttonSelectedEventCallback = new EventEmitter<string>();

  selectButton(button: string) {
    this.selectedButton = button;
    this.buttonSelectedEventCallback.emit(button);
  }
}
