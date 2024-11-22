import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Make sure to use 'styleUrls' instead of 'styleUrl'
})
export class NavbarComponent {
  dropdownVisible = false;
  user: IUser | null = null;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  // Method to toggle the dropdown visibility
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible; // Toggle visibility
  }
}
