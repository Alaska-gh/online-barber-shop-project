import { Routes } from '@angular/router';
import {
  authGuard,
  resolveGuard,
} from './authenticationModule/guards/authGuard';
import { HomeComponent } from './LandingPageModule/home-component/home-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'stylists',
    loadComponent: () =>
      import(
        './stylistsModule/stylists-container-component/stylist-list-component/stylist-list-component'
      ).then((comp) => comp.StylistListComponent),
    resolve: { stylist: resolveGuard },
    data: { preload: true },
    children: [
      {
        path: 'stylist/:id',
        loadComponent: () =>
          import(
            './stylistsModule/stylists-container-component/stylist-list-component/stylist-details-component/stylist-details-component'
          ).then((comp) => comp.StylistDetailsComponent),
      },
    ],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./authenticationModule/signup-component/signup-component').then(
        (comp) => comp.SignupComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./authenticationModule/login/login').then((comp) => comp.Login),
  },
  {
    path: 'booking',
    loadComponent: () =>
      import('./appointments-component/appointments-component').then(
        (comp) => comp.AppointmentsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './stylistsModule/stylist-dashboard-layout/stylist-dashboard-layout'
      ).then((comp) => comp.StylistDashboardLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'summary',
        loadComponent: () =>
          import(
            './stylistsModule/stylist-dashboard-layout/stylist-dashboard-component/stylist-dashboard-component'
          ).then((comp) => comp.StylistDashboardComponent),
        data: { preload: true },
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import(
            './stylistsModule/stylist-dashboard-layout/stylist-appointment-component/stylist-appointment-component'
          ).then((comp) => comp.StylistAppointmentComponent),
        data: { preload: true },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './stylistsModule/stylist-dashboard-layout/stylist-customers-component/stylist-customers-component'
          ).then((comp) => comp.StylistCustomersComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './stylistsModule/stylist-dashboard-layout/stylist-settings-component/stylist-settings-component'
          ).then((comp) => comp.StylistSettingsComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import(
            './stylistsModule/stylist-dashboard-layout/stylist-profile-component/stylist-profile-component'
          ).then((comp) => comp.StylistProfileComponent),
      },
    ],
  },
  {
    path: 'customer/appointments',
    loadComponent: () =>
      import(
        './customerModule/customer-appointments-component/customer-appointments-component'
      ).then((comp) => comp.CustomerAppointmentsComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import(
        './stylesAndServices/styles-and-services-component/styles-and-services-component'
      ).then((comp) => comp.StylesAndServicesComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./wild-card-component/wild-card-component').then(
        (comp) => comp.WildCardComponent
      ),
  },
];
