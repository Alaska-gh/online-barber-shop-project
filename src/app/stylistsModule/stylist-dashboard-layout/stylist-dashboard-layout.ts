import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth-service';
import { Router, RouterModule } from '@angular/router';
import { ConfirmLogoutComponent } from '../../confirm-logout.component/confirm-logout.component';
import { User } from '../../interfaces/user.interface';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [RouterModule, ConfirmLogoutComponent, CommonModule],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css',
})
export class StylistDashboardLayout implements OnInit {
  //Tracks whether the user is logged in
  isLoggedIn: boolean;

  //Stores the current stylist's user information
  currentStylist: User;

  //Controls visibility of the confirmation modal for logging out
  showConfirmLogout: boolean = false;

  //List of all appointments for the stylist
  appointments: Appointment[] = [];

  //Controls whether the sidebar is collapsed or expanded
  isSidebarCollapsed = false;

  //Holds the subscription for polling appointments
  pollSub: Subscription;

  // Service injections
  authService = inject(UserAuthService);
  router: Router = inject(Router);
  bookingService = inject(BookingService);
  toastr = inject(ToastrService);

  /*
    Lifecycle hook that runs after component initialization.
    - Retrieves login state and current stylist information.
    - Sets up polling to refresh appointments every second.
   */
  ngOnInit(): void {
    // Check login state
    this.isLoggedIn = this.authService.logInState.value;

    // Subscribe to current user changes
    this.authService.currentUser.subscribe((currentUser) => {
      this.currentStylist = currentUser;
    });

    // Poll for appointments every second
    this.pollSub = interval(1000).subscribe(() => {
      this.loadAppointments();
    });
  }

  // Toggles sidebar collapse/expand state.
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  /*
    Loads all appointments for the current stylist.
    Displays a toast notification in case of an error.
   */
  loadAppointments() {
    this.bookingService
      .getAllAppointmentsForStylist(this.currentStylist.bussinessName)
      .subscribe({
        next: (appts) => {
          this.appointments = appts;
        },
        error: (errMsg) => {
          this.toastr.error(errMsg);
        },
      });
  }

  /*
   Opens the confirmation modal when the logout button is clicked.
    The click event to prevent default link navigation.
   */
  onLogOutClicked(event: Event) {
    event.preventDefault();
    this.showConfirmLogout = true;
  }

  //  Handles logout confirmation.
  confirmLogout(value: boolean) {
    this.showConfirmLogout = false;
    if (value) {
      this.authService.logoutUser();
      this.router.navigate(['home']);
    }
  }
  // Computed property that returns only the stylist's pending appointments.
  get pendingAppointments() {
    return this.appointments.filter((appt) => appt.status === 'pending');
  }
}
