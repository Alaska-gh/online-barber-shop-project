import { Routes } from '@angular/router';
import { HomeComponent } from './LandingPageModule/home-component/home-component';


import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { StylistListComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-list-component';
import { WildCardComponent } from './wild-card-component/wild-card-component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'stylist', component: StylistListComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: WildCardComponent}
];


