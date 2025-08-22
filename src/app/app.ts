import { Component, inject, OnInit } from '@angular/core';

import { FooterComponent } from './footer-component/footer-component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component/header.component';
import { NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmLogoutComponent } from './confirm-logout.component/confirm-logout.component';
import { UserAuthService } from './services/user-auth-service';


@Component({
  selector: 'app-root',
  
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
    ConfirmLogoutComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  router: Router = inject(Router)

  dashboardLoaded = false
  showConfirmLogout: boolean = false


  userAuthService = inject(UserAuthService)

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.dashboardLoaded = event.urlAfterRedirects.includes('/dashboard');
      });

      
  }
logoutBtnClicked(value){
 this.showConfirmLogout = value 
}
 confirmLogOut(value){
  this.showConfirmLogout = false

  if(value){
    this.userAuthService.logoutStylist()
    this.router.navigate(['login'])
  }
 }
}
