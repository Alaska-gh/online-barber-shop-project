import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component/header.component';
import { HeroComponent } from './hero.component/hero.component';
import { StylesComponent } from './styles.component/styles.component';
import { AboutComponent } from './about.component/about.component';
import { AdvertComponent } from './advert.component/advert.component';
import { BannerComponent } from './banner.component/banner.component';
import { StarredBarbersComponent } from './starred-barbers.component/starred-barbers.component';
import { SubscribeComponent } from './subscribe.component/subscribe.component';
import { ClientFeedbackComponent } from './client-feedback-component/client-feedback-component';
import { BottomBannerComponent } from './bottom-banner-component/bottom-banner-component';

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
     BottomBannerComponent
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
