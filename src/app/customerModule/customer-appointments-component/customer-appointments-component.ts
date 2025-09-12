import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../interfaces/appointment.interface';
import { BookingService } from '../../services/booking.service';
import { UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { TimeFormatter } from '../../services/format-time.service';
import { ToastrService } from 'ngx-toastr';
import { Loader } from '../../utilities/loader/loader';

@Component({
  selector: 'app-customer-appointments-component',
  imports: [CommonModule, Loader],
  templateUrl: './customer-appointments-component.html',
  styleUrl: './customer-appointments-component.css',
})
export class CustomerAppointmentsComponent implements OnInit {
  // Stores all of the customer's upcoming appointments that have not yet ended
  currentAppointments: Appointment[] = [];

  // Stores all past appointments (completed or expired)
  pastAppointments: Appointment[] = [];

  // Stores today's appointments (if you later want to filter only today's)
  todysAppointments: Appointment[] = [];

  // Stores logged-in customer information
  currentUser: User;

  // Keeps track of which filter button (pending, confirmed, rejected) is selected
  button: string = 'pending';

  // Controls the display of a loader while fetching data
  isLoading: boolean;

  // Dependency injection for services
  bookingService: BookingService = inject(BookingService);
  authService: UserAuthService = inject(UserAuthService);
  timeFormatService = inject(TimeFormatter);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    // Get the current logged-in user's data
    this.currentUser = this.authService.currentUser.value;

    // Load appointments for this user as soon as component initializes
    this.loadAppointments();
  }

  /*
    Loads all appointments for the logged-in customer.
   - Separates them into current (upcoming) and past appointments.
    - Displays loader until data is fully loaded.
   */
  loadAppointments() {
    this.isLoading = true;

    this.bookingService
      .getAppointmentsForCustomer(this.currentUser.email)
      .subscribe({
        next: (appts) => {
          const now = new Date();

          // Categorize appointments into current vs past
          for (const apt of appts) {
            const aptDate = new Date(apt.dateTime);

            // Appointment is considered "current" if it has not ended
            if (aptDate >= now && !this.bookingService.apptHasEnded(apt)) {
              this.currentAppointments.push(apt);
            } else {
              this.pastAppointments.push(apt);
            }
          }

          this.isLoading = false;
        },
        error: (errMsg) => {
          // Delay hiding the loader slightly for smoother UX
          setTimeout(() => {
            this.isLoading = false;
            this.toastr.error(errMsg);
          }, 3000);
        },
      });
  }

  /**
   Handles switching between different appointment views
    (e.g., pending, confirmed, rejected)
   */
  switchTo(event: Event) {
    const btn = event.target as HTMLButtonElement;
    this.button = btn.value;
  }

  /**
    Formats the appointment date/time into a more user-friendly format
    using the custom TimeFormatter service.
   */
  formatTime(date: string) {
    return this.timeFormatService.formatTime(date);
  }

  /*
    Returns only the appointments with status 'confirmed'
    Useful for filtering view in template.
   */
  get confirmedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'confirmed'
    );
  }

  // Returns only the appointments with status 'rejected'
  get rejectedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'rejected'
    );
  }

  // Returns only the appointments with status 'pending'
  get pendingAppointments() {
    return this.currentAppointments.filter((appt) => appt.status === 'pending');
  }
}
