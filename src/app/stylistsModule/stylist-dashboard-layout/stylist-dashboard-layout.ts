import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth-service';
import { StylistDashboardComponent } from './stylist-dashboard-component/stylist-dashboard-component';
import { Router, RouterModule } from '@angular/router';
import { ConfirmLogoutComponent } from '../../confirm-logout.component/confirm-logout.component';
import { User } from '../../interfaces/user.interface';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [RouterModule, ConfirmLogoutComponent, CommonModule],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css',
})
export class StylistDashboardLayout {
  // properties
  isLoggedIn: boolean;
  currentStylist: User;
  showConfirmLogout: boolean = false;
  appointments: Appointment[] = [];
  isSidebarCollapsed = false;

  // instances
  authService = inject(UserAuthService);
  router: Router = inject(Router);
  bookingService = inject(BookingService);
  pollSub: Subscription;
  toastr = inject(ToastrService);

  // methods
  ngOnInit(): void {
    this.isLoggedIn = this.authService.logInState.value;
    this.authService.currentUser.subscribe((currentUser) => {
      this.currentStylist = currentUser;
    });

    this.pollSub = interval(1000).subscribe(() => {
      this.loadAppointments();
    });
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

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
  onLogOutClicked(event: Event) {
    event.preventDefault(); //preventing the default behaviur of the anchor element
    this.showConfirmLogout = true;
  }

  confirmLogout(value: boolean) {
    this.showConfirmLogout = false;
    if (value) {
      this.authService.logoutStylist();
      this.router.navigate(['home']);
    }
  }

  get pendingAppointments() {
    return this.appointments.filter((appt) => appt.status === 'pending');
  }
}
