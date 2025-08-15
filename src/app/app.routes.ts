import { Routes } from '@angular/router';
import { HomeComponent } from './LandingPageModule/home-component/home-component';
import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { StylistListComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-list-component';
import { WildCardComponent } from './wild-card-component/wild-card-component';
import { StylistDetailsComponent } from './stylistsModule/stylists-container-component/stylist-list-component/stylist-details-component/stylist-details-component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'stylists', component: StylistListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stylists', children:[
    {
      path: 'stylist/:id', component: StylistDetailsComponent
    }
  ]},
  {path: '**', component: WildCardComponent}
];


