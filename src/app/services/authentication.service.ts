import { inject, Injectable } from '@angular/core';
import { IAuthentication } from '../models/authentication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);
  authentication: IAuthentication = { refresh: '', access: '' };
  private authToken: string | null = null;

  constructor(
    private userService: UserService // Inject UserService into AuthenticationService
  ) {}

  getToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken');
    }
    return this.authToken;
  }

  setToken(token: string): void {
    this.authToken = token; // Save in-memory
    localStorage.setItem('authToken', token); // Persist in localStorage
  }

  clearToken(): void {
    this.authToken = null;
    localStorage.removeItem('authToken'); // Clear from localStorage
  }

  getHttpHeaders(customHeaders: { [key: string]: string } = {}): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    for (const [key, value] of Object.entries(customHeaders)) {
      headers = headers.set(key, value);
    }

    return headers;
  }

  loginAndFetchUser(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}core/login/`, { username, password })
      .pipe(
        switchMap((response) => {
          this.setToken(response.access); // Set the token
          const headers = this.getHttpHeaders(); // Get headers with token
          return this.userService.setUser(headers); // Fetch user data
        })
      );
  }
}
