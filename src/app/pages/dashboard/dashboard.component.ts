import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { ContentContainerComponent } from '../../components/dashboard/content-container/content-container.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, ContentContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isModalVisible: boolean = false; // Control modal visibility

  // Method to open the modal
  openModal() {
    this.isModalVisible = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalVisible = false;
  }
}
