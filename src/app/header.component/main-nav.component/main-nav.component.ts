import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserAuthService } from '../../services/user-auth-service';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { Collapse } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'main-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})
export class MainNavComponent implements OnInit, AfterViewInit {
  // Flag that tracks whether the user is logged in or not.

  isLoggedIn: boolean;

  // Stores the currently logged-in user's data.
  user: User;

  //  Holds the list of ongoing appointments for the current user.
  ongoingAppointments: Appointment[] = [];

  // Holds the subscription to the polling interval so it can be cleaned up later
  pollSub: Subscription;

  // Dependency injections
  authService = inject(UserAuthService);
  router: Router = inject(Router);
  bookingService = inject(BookingService);
  dynamicComponent = inject(DynamicComponent);
  toastr = inject(ToastrService);

  //  Reference to the navbar element in the template used for Bootstrap collapse functionality.
  @ViewChild('navBarToggle', { static: true }) toggleNavBarEl!: ElementRef;

  //   Bootstrap collapse instance used to programmatically toggle and close the navbar.
  private collapse: Collapse;

  /**
    Lifecycle hook: Subscribes to authentication state and current user,
    then starts polling for user appointments every second.
   */
  ngOnInit(): void {
    // Track login state to dynamically show/hide nav items
    this.authService.logInState.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    // Keep current user information updated
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
    });

    // Poll appointments every 1 second to keep them updated in real-time
    this.pollSub = interval(1000).subscribe(() => {
      this.loadAppointments();
    });
  }

  /**
   Lifecycle hook: Initializes Bootstrap's Collapse functionality
    after the view has been fully initialized.
   */
  ngAfterViewInit() {
    this.collapse = new Collapse(this.toggleNavBarEl.nativeElement, {
      toggle: false,
    });
  }

  // Toggles the navbar open/close state.
  toggleNavBar() {
    this.collapse.toggle();
  }

  //  Closes the navbar manually (useful for clicking links inside the nav).
  closeNavBar() {
    this.collapse.hide();
  }

  /**
    Fetches appointments for the current user, filtering only those
    that are upcoming, not ended, and not rejected.
   */
  loadAppointments() {
    if (this.user?.email) {
      this.bookingService
        .getAppointmentsForCustomer(this.user.email)
        .subscribe({
          next: (appts) => {
            const today = new Date();
            this.ongoingAppointments = appts.filter(
              (appt) =>
                new Date(appt.dateTime) >= today &&
                !this.bookingService.apptHasEnded(appt) &&
                appt.status !== 'rejected'
            );
          },
        });
    }
  }

  /*
    Handles logout link click. Triggers the dynamic component event
    that opens the logout confirmation modal.
   */
  onLogoutClicked(event: Event) {
    this.dynamicComponent.logoutBtnCliked();
    event.preventDefault(); // Prevents default anchor navigation
  }

  // Handles login button click, showing the login form dynamically.
  onLoginButtonClicked(event: boolean) {
    this.dynamicComponent.loginBtnClicked(event);
  }

  //  Handles signup button click, showing the signup form dynamically.
  onSignupBtnClicked(value: boolean) {
    this.dynamicComponent.signupBtnClicked(value);
  }
}
