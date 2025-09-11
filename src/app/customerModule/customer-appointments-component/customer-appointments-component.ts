import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../interfaces/appointment.interface';
import { BookingService } from '../../services/booking.service';
import { UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
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
  todysAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  currentAppointments: Appointment[] = [];
  currentUser: User;
  button: string = 'pending';
  isLoading: boolean;

  bookingService: BookingService = inject(BookingService);
  authService: UserAuthService = inject(UserAuthService);
  timeFormatService = inject(TimeFormatter);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser.value;

    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.bookingService
      .getAppointmentsForCustomer(this.currentUser.email)
      .subscribe({
        next: (appts) => {
          const now = new Date();
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
          setTimeout(() => {
            this.isLoading = false;
            this.toastr.error(errMsg);
          }, 3000);
        },
      });
  }

  switchTo(event: Event) {
    const btn = event.target as HTMLButtonElement;
    this.button = btn.value;
  }

  formatTime(date: string) {
    return this.timeFormatService.formatTime(date);
  }

  get confirmedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'confirmed'
    );
  }
  get rejectedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'rejected'
    );
  }
  get pendingAppointments() {
    return this.currentAppointments.filter((appt) => appt.status === 'pending');
  }
}
