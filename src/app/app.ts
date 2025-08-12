import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeroComponent } from './LanddingPageModule/hero.component/hero.component';
import { StylesComponent } from './LanddingPageModule/styles.component/styles.component';
import { AboutComponent } from './LanddingPageModule/about.component/about.component';
import { AdvertComponent } from './LanddingPageModule/advert.component/advert.component';
import { BannerComponent } from './LanddingPageModule/banner.component/banner.component';
import { StarredBarbersComponent } from './LanddingPageModule/starred-barbers.component/starred-barbers.component';
import { SubscribeComponent } from './LanddingPageModule/subscribe.component/subscribe.component';
import { ClientFeedbackComponent } from './LanddingPageModule/client-feedback-component/client-feedback-component';
import { BottomBannerComponent } from './LanddingPageModule/bottom-banner-component/bottom-banner-component';
import { FooterComponent } from './LanddingPageModule/footer-component/footer-component';
import { SignupComponent } from "./authenticationModule/signup-component/signup-component";
import { HeaderComponent } from './LanddingPageModule/header.component/header.component';
import { StylistsContainerComponent } from './stylistsModule/stylists-container-component/stylists-container-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent,
    HeroComponent,
    StylesComponent,
    AboutComponent,
    AdvertComponent,
    BannerComponent,
    StarredBarbersComponent,
    SubscribeComponent,
    ClientFeedbackComponent,
    BottomBannerComponent,
    FooterComponent,
    SignupComponent,
    StylistsContainerComponent
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 signup: boolean = false;
  
 showStylistPage: boolean = true;

  recieveSignupEvent(value: boolean){ 
    this.signup = value
    // this.showStylistPage = value
  }

}
