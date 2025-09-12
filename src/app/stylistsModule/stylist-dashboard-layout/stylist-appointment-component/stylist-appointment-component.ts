import { BookingService } from './../../../services/booking.service';
import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment.interface';
import { User } from '../../../interfaces/user.interface';
import { UserAuthService } from '../../../services/user-auth-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { TimeFormatter } from '../../../services/format-time.service';
import { Loader } from '../../../utilities/loader/loader';

@Component({
  selector: 'app-stylist-appointment-component',
  imports: [CommonModule, Loader],
  templateUrl: './stylist-appointment-component.html',
  styleUrl: './stylist-appointment-component.css',
})
export class StylistAppointmentComponent implements OnInit {
  // The currently logged-in stylist
  currentStylist: User;

  // Holds all current/future appointments
  currentAppointments: Appointment[] = [];

  // Holds all past appointments
  pastAppointments: Appointment[] = [];

  //Tracks the active tab (pending, confirmed, rejected)
  button: string = 'pending';

  // Loading state for showing a spinner/loader
  isLoading: boolean;

  // Dependency injection using Angular's `inject()` function
  bookingService = inject(BookingService);
  authService = inject(UserAuthService);
  toastr = inject(ToastrService);
  timeFormatService = inject(TimeFormatter);

  ngOnInit(): void {
    this.currentStylist = this.authService.currentUser.value;
    this.loadAppointments();
  }

  /*
    Fetches all appointments for the current stylist,
    separates them into current/future and past appointments,
    and handles loading/error states.
   */
  loadAppointments() {
    this.isLoading = true;
    if (this.currentStylist) {
      this.bookingService
        .getAllAppointmentsForStylist(this.currentStylist.bussinessName)
        .subscribe({
          next: (appts) => {
            const now = new Date();

            // Categorize appointments into current and past
            for (const apt of appts) {
              const aptDate = new Date(apt.dateTime);
              if (aptDate >= now && !this.bookingService.apptHasEnded(apt)) {
                this.currentAppointments.push(apt);
              } else {
                this.pastAppointments.push(apt);
              }
            }

            this.isLoading = false;
          },
          error: (errMsg) => {
            // Show error after slight delay to allow UI feedback
            setTimeout(() => {
              this.isLoading = false;
              this.toastr.error(errMsg);
            }, 3000);
          },
        });
    }
  }

  // Updates the appointment status to "confirmed" and reloads the appointments list.

  confirmAppointment(id: string) {
    this.bookingService.updateAppointmentStatus(id, 'confirmed').subscribe({
      next: () => {
        this.toastr.success('Appointment Confirmed', 'Confirmed');
        this.loadAppointments();
      },
      error: (errMsg) => {
        this.toastr.error(errMsg);
      },
    });
  }

  //  Updates the appointment status to "rejected" and reloads the appointments list.
  rejectAppointment(id: string) {
    this.bookingService.updateAppointmentStatus(id, 'rejected').subscribe({
      next: () => {
        this.toastr.error(`You've Cancelled the appointment`);
        this.loadAppointments();
      },
      error: (errMsg) => {
        this.toastr.error(errMsg);
      },
    });
  }

  // Handles tab switching between pending, confirmed, and rejected appointments.

  switchTo(event: Event) {
    const btn = event.target as HTMLButtonElement;
    this.button = btn.value;
  }

  // Utility method to format appointment time using the TimeFormatter service.

  formatTime(date: string) {
    return this.timeFormatService.formatTime(date);
  }

  // Returns only confirmed appointments.
  get cornfirmedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'confirmed'
    );
  }

  //Returns only pending appointments.
  get pendingAppointments() {
    return this.currentAppointments.filter((appt) => appt.status === 'pending');
  }

  //  Returns only rejected appointments.
  get rejectedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'rejected'
    );
  }
}
