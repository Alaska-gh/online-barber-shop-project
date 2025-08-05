import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component/header.component';
import { HeroComponent } from './hero.component/hero.component';
import { StylesComponent } from './styles.component/styles.component';
import { AboutComponent } from './about.component/about.component';
import { AdvertComponent } from './advert.component/advert.component';
import { BannerComponent } from './banner.component/banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
     HeaderComponent, 
     HeroComponent, 
     StylesComponent,
     AboutComponent,
     AdvertComponent,
     BannerComponent,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
