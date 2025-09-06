import { Component, inject, OnInit } from '@angular/core';

import { FooterComponent } from './footer-component/footer-component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmLogoutComponent } from './confirm-logout.component/confirm-logout.component';
import { UserAuthService } from './services/user-auth-service';
import { ToastrService } from 'ngx-toastr';
import { Login } from './authenticationModule/login/login';
import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { DynamicComponent } from './services/dynamicComponent.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
    ConfirmLogoutComponent,
    Login,
    SignupComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  dashboardLoaded = false;
  showConfirmLogout: boolean = false;
  showLoginForm: boolean = false;
  showSignupForm: boolean = false;

  userAuthService = inject(UserAuthService);
  dynamicComponent = inject(DynamicComponent);
  router: Router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.dashboardLoaded = event.urlAfterRedirects.includes('/dashboard');
      });
    this.dynamicComponent.logoutBtnClickedEvent.subscribe((value) => {
      this.showConfirmLogout = value;
    });

    this.dynamicComponent.loginBtnClickedEvent.subscribe(
      (value) => (this.showLoginForm = value)
    );

    this.dynamicComponent.signupBtnClickedEvent.subscribe((value) => {
      this.showSignupForm = value;
    });
  }

  confirmLogOut(value) {
    this.showConfirmLogout = false;
    if (value) {
      this.userAuthService.logoutStylist();
      this.router.navigate(['home']);
    }
  }
}
