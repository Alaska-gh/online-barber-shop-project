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
  currentStylist: User;
  currentAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  button: string = 'pending';
  isLoading: boolean;

  bookingService = inject(BookingService);
  authService = inject(UserAuthService);
  toastr = inject(ToastrService);
  timeFormatService = inject(TimeFormatter);

  ngOnInit(): void {
    this.currentStylist = this.authService.currentUser.value;

    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    if (this.currentStylist) {
      this.bookingService
        .getAllAppointmentsForStylist(this.currentStylist.bussinessName)
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
  }

  confirmAppointment(id: string) {
    this.bookingService.updateAppointmentStatus(id, 'confirmed').subscribe({
      next: () => {
        this.loadAppointments();
        this.toastr.success('Appointment Confirmed', 'Confirmed');
      },
      error: (errMsg) => {
        this.toastr.error(errMsg);
      },
    });
  }
  rejectAppointment(id: string) {
    this.bookingService.updateAppointmentStatus(id, 'rejected').subscribe({
      next: () => {
        this.loadAppointments();
        this.toastr.error(`You've Cancelled the appointment`);
      },
      error: (errMsg) => {
        this.toastr.error(errMsg);
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

  get cornfirmedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'confirmed'
    );
  }

  get pendingAppointments() {
    return this.currentAppointments.filter((appt) => appt.status === 'pending');
  }

  get rejectedAppointments() {
    return this.currentAppointments.filter(
      (appt) => appt.status === 'rejected'
    );
  }
}
