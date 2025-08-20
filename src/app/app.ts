import { Component, inject, OnInit } from '@angular/core';

import { FooterComponent } from './footer-component/footer-component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component/header.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs';


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
export class App implements OnInit{

  router: Router = inject(Router)

  dashboardLoaded = false


  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.dashboardLoaded = event.urlAfterRedirects.includes('/dashboard');
      });
  }
}
