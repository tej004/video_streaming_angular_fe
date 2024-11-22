import { Component, OnInit } from '@angular/core';
import { NavToggleButtonsComponent } from '../nav-toggle-buttons/nav-toggle-buttons.component';
import { CommonModule } from '@angular/common';
import { WatchNowComponent } from '../watch-now-components/watch-now/watch-now.component';
import { ActivatedRoute, Router } from '@angular/router';
import { YourVideosContainerComponent } from '../your-videos/your-videos-container/your-videos-container.component';
import { LibraryContainerComponent } from '../library-components/library-container/library-container.component';

@Component({
  selector: 'app-content-container',
  imports: [
    CommonModule,
    NavToggleButtonsComponent,
    YourVideosContainerComponent,
    WatchNowComponent,
    LibraryContainerComponent,
  ],
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css'],
})
export class ContentContainerComponent implements OnInit {
  selectedButton: string = 'genres';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const toggle = params['toggle'];
      if (toggle) {
        this.selectedButton = toggle;
      }
    });
  }

  onButtonSelectedEventCallback(button: string) {
    this.selectedButton = button;
    this.updateQueryParams(button);
  }
  private updateQueryParams(button: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { toggle: button },
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
  }
}
