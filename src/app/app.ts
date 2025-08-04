import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component/header.component';
import { HeroComponent } from './hero.component/hero.component';
import { StylesComponent } from './styles.component/styles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent, StylesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
