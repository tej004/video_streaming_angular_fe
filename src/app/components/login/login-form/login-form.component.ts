import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  username: WritableSignal<string> = signal('');
  password: WritableSignal<string> = signal('');

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLogin(): void {
    const username = this.username();
    const password = this.password();

    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }

    // Call the loginAndFetchUser method from AuthenticationService
    this.authService.loginAndFetchUser(username, password).subscribe({
      next: (_) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error logging in or fetching user data:', err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
