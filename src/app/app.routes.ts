import { Routes } from '@angular/router';
import { HomeComponent } from './LandingPageModule/home-component/home-component';
import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { StylistListComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-list-component';
import { WildCardComponent } from './wild-card-component/wild-card-component';
import { StylistDetailsComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-details-component/stylist-details-component';
import { Login } from './authenticationModule/login/login';
import { AppointmentsComponent } from './appointments-component/appointments-component';
import { authGuard } from './authenticationModule/guards/authGuard';
import { StylistDashboardLayout } from './stylistsModule/stylist-dashboard-layout/stylist-dashboard-layout';
import { StylesAndServicesComponent } from './stylesAndServices/styles-and-services-component/styles-and-services-component';
import { StylistAppointmentComponent } from './stylistsModule/stylist-dashboard-layout/stylist-appointment-component/stylist-appointment-component';
import { StylistCustomersComponent } from './stylistsModule/stylist-dashboard-layout/stylist-customers-component/stylist-customers-component';
import { StylistSettingsComponent } from './stylistsModule/stylist-dashboard-layout/stylist-settings-component/stylist-settings-component';
import { StylistDashboardComponent } from './stylistsModule/stylist-dashboard-layout/stylist-dashboard-component/stylist-dashboard-component';
import { StylistProfileComponent } from './stylistsModule/stylist-dashboard-layout/stylist-profile-component/stylist-profile-component';
import { CustomerAppointmentsComponent } from './customerModule/customer-appointments-component/customer-appointments-component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'stylists', component: StylistListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stylists', children:[
    {
      path: 'stylist/:id', component: StylistDetailsComponent
    }
  ]},
  {path: 'login', component: Login},
  {path: 'booking', component: AppointmentsComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: StylistDashboardLayout, canActivate: [authGuard],
    children:[
      {path: 'summary', component: StylistDashboardComponent},
      {path: 'appointments', component: StylistAppointmentComponent},
      {path: 'customers', component: StylistCustomersComponent},
      {path: 'settings', component: StylistSettingsComponent},
      {path: 'profile', component: StylistProfileComponent}
    ]
  },
  {path: 'customer/appointments', component: CustomerAppointmentsComponent},
  {path: 'services', component: StylesAndServicesComponent},
  {path: '**', component: WildCardComponent},
];


