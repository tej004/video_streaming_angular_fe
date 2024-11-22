import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  constructor() {}

  // Method to fetch user data and store it in localStorage
  setUser(headers: HttpHeaders): Observable<IUser> {
    const options = {
      headers: headers,
    };

    return this.http
      .get<IUser>(`${environment.API_URL}core/users/`, options)
      .pipe(
        tap((userData) => {
          const userWithAuth = {
            ...userData,
            isAuthenticated: true,
          };

          // Save the user data with the isAuthenticated key to localStorage
          localStorage.setItem('user', JSON.stringify(userWithAuth));
        })
      );
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Return the parsed user or null if not found
  }

  isAuthenticated(): boolean {
    const user = this.getUser();
    return user !== null && user.isAuthenticated === true;
  }

  clearUser(): void {
    localStorage.removeItem('user'); // Remove user data from localStorage
  }
}
