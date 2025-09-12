import { Component, inject, OnInit } from '@angular/core';

import { FooterComponent } from './footer-component/footer-component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component/header.component';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmLogoutComponent } from './confirm-logout.component/confirm-logout.component';
import { UserAuthService } from './services/user-auth-service';
import { ToastrService } from 'ngx-toastr';
import { Login } from './authenticationModule/login/login';
import { SignupComponent } from './authenticationModule/signup-component/signup-component';
import { DynamicComponent } from './services/dynamicComponent.service';
import { Loader } from './utilities/loader/loader';

@Component({
  selector: 'app-root',
  // Import shared components and modules used in the root template
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
    ConfirmLogoutComponent,
    Login,
    SignupComponent,
    Loader,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // State variables used for conditional rendering in the template
  dashboardLoaded: boolean;
  showConfirmLogout: boolean;
  showLoginForm: boolean;
  showSignupForm: boolean;
  showLoader: boolean = false;

  // Dependency injections for services and router
  userAuthService = inject(UserAuthService);
  dynamicComponent = inject(DynamicComponent);
  router: Router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    // Detect when navigation ends and check if the current route is dashboard
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.dashboardLoaded = event.urlAfterRedirects.includes('/dashboard');
      });

    // Subscribe to logout button event (from dynamic components)
    this.dynamicComponent.logoutBtnClickedEvent.subscribe((value) => {
      this.showConfirmLogout = value;
    });

    // Subscribe to login button event and toggle forms accordingly
    this.dynamicComponent.loginBtnClickedEvent.subscribe((value) => {
      this.showLoginForm = value;
      this.showSignupForm = false; // ensure signup form is hidden
    });

    // Subscribe to signup button event and toggle forms accordingly
    this.dynamicComponent.signupBtnClickedEvent.subscribe((value) => {
      this.showSignupForm = value;
      this.showLoginForm = false; // ensure login form is hidden
    });

    // Show a loader when navigation starts, hide it when navigation completes
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoader = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoader = false;
      }
    });
  }

  confirmLogOut(value: boolean) {
    this.showConfirmLogout = false;
    if (value) {
      // Perform logout and redirect to home page
      this.userAuthService.logoutUser();
      this.router.navigate(['home']);
    }
  }
}
