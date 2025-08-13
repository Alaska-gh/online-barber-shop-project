import { Component, inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { NavigationService } from './services/navigation.service';

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
    StylistsContainerComponent,
    CommonModule
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
 link: string = '';
  
  navservice = inject(NavigationService)

  ngOnInit(): void {
    this.navservice.navLinkChangeEvent.subscribe((value) => {
      this.link = value
    })  
  }

}
