import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../interfaces/appointment.interface';
import { BookingService } from '../../services/booking.service';
import { UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TimeFormatter } from '../../services/format-time.service';

@Component({
  selector: 'app-customer-appointments-component',
  imports: [CommonModule],
  templateUrl: './customer-appointments-component.html',
  styleUrl: './customer-appointments-component.css',
})
export class CustomerAppointmentsComponent implements OnInit {
  todysAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  currentAppointments: Appointment[] = [];
  currentUser: User;
  pollSub: Subscription;
  button: string = 'pending';

  bookingService: BookingService = inject(BookingService);
  authService: UserAuthService = inject(UserAuthService);
  timeFormatService = inject(TimeFormatter);

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser.value;

    this.pollSub = interval(1000).subscribe(() => {
      this.loadAppointments();
    });
  }

  ngOnDestroy() {
    this.pollSub.unsubscribe();
  }

  loadAppointments() {
    this.bookingService
      .getAppointmentsByCustomer(this.currentUser.email)
      .subscribe((appts) => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        this.todysAppointments = appts.filter((appt) => appt.date === today);
        this.pastAppointments = appts.filter(
          (appt) =>
            new Date(`${appt.date}T${appt.time}`) < now &&
            this.bookingService.apptHasEnded(appt)
        );
        this.currentAppointments = appts.filter(
          (appt) =>
            new Date(`${appt.date}T${appt.time}`) >= now &&
            this.bookingService.apptHasEnded(appt)
        );
      });
  }

  switchTo(event: Event) {
    const btn = event.target as HTMLButtonElement;
    this.button = btn.value;
  }

  formatTime(date: string, time: string) {
    return this.timeFormatService.formatTime(date, time);
  }

  get confirmedAppointments() {
    return this.todysAppointments.filter((appt) => appt.status === 'confirmed');
  }
  get rejectedAppointments() {
    return this.todysAppointments.filter((appt) => appt.status === 'rejected');
  }
  get pendingAppointments() {
    return this.todysAppointments.filter((appt) => appt.status === 'pending');
  }
}
