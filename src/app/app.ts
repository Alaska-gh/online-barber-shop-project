import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component/header.component';
import { HeroComponent } from './hero.component/hero.component';
import { StylesComponent } from './styles.component/styles.component';
import { AboutComponent } from './about.component/about.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
     HeaderComponent, 
     HeroComponent, 
     StylesComponent,
     AboutComponent,
     
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
