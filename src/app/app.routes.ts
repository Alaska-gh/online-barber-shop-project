import { Routes } from '@angular/router';
import { HomeComponent } from './LandingPageModule/home-component/home-component';
import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { StylistListComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-list-component';
import { WildCardComponent } from './wild-card-component/wild-card-component';
import { StylistDetailsComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-details-component/stylist-details-component';
import { Login } from './authenticationModule/login/login';
import { AppointmentsComponent } from './appointments-component/appointments-component';
import { CanActivate } from './authenticationModule/guards/authGuard';
import { StylistDashboardLayout } from './stylistsModule/stylist-dashboard-layout/stylist-dashboard-layout';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'stylists', component: StylistListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stylists', children:[
    {
      path: 'stylist/:id', component: StylistDetailsComponent,
       canActivate: [CanActivate]
    }
  ]},
  {path: 'login', component: Login},
  {path: 'booking', component: AppointmentsComponent},
  {path: 'dashboard', component: StylistDashboardLayout},
  {path: '**', component: WildCardComponent},
  
];


