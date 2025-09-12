import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MainNavComponent } from './main-nav.component/main-nav.component';
import { TopNavComponent } from './top-nav.component/top-nav.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'header-component',
  imports: [MainNavComponent, TopNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // Holds the current route (URL) for conditional rendering or highlighting active links
  currentRoute: string;

  // Inject Angular Router to listen for navigation events
  activeRoute: Router = inject(Router);

  ngOnInit(): void {
    /*
     Subscribe to router navigation events and filter for NavigationEnd
     When navigation ends, update `currentRoute` with the new URL.
     */
    this.activeRoute.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }
}
