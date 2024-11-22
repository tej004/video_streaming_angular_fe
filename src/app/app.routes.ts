import { Routes } from '@angular/router';
import { authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./pages/login/login.component');
      return m.LoginComponent;
    },
  },
  {
    path: 'dashboard',
    loadComponent: async () => {
      const m = await import('./pages/dashboard/dashboard.component');
      return m.DashboardComponent;
    },
    canActivate: [authenticationGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
