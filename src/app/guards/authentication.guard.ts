import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service'; // Import your UserService

export const authenticationGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Inject UserService
  const router = inject(Router); // Inject Router

  const isAuthenticated = userService.isAuthenticated();

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    router.navigate(['/login']);
    return false;
  }

  return true;
};
