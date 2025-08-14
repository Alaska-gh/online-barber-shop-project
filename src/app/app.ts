import { Component } from '@angular/core';

import { FooterComponent } from './footer-component/footer-component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component/header.component';
import { RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
   
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


}
