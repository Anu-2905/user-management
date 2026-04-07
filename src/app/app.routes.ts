import { Routes } from '@angular/router';

export const routes: Routes = [

  // Default → Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  //  Login Page
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component')
        .then(m => m.LoginComponent)
  },
  {
  path: 'signup',
  loadComponent: () =>
    import('./signup/signup.component')
      .then(m => m.SignupComponent)
  },
  // Dashboard with child routes
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent),

    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./dashboard/Menu/user/user.component')
            .then(m => m.UserComponent)
      },
      {
        path: 'images',
        loadComponent: () =>
          import('./dashboard/Menu/images/images.component')
            .then(m => m.ImagesComponent)
      },
      {
        path: 'graphs',
        loadComponent: () =>
          import('./dashboard/Menu/graphs/graphs.component')
            .then(m => m.GraphsComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
            import('./dashboard/Menu/settings/settings.component')
                 .then(m => m.SettingsComponent)
      }
    ]
  }

];
