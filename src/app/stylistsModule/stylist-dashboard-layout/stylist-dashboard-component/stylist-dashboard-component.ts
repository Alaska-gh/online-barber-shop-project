import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth-service';
import { TimeService } from '../../../services/timeOfDay.service';
import { CalendarEvent, CalendarModule, CalendarUtils } from 'angular-calendar';
import { User } from '../../../interfaces/user.interface';
import { BookingService } from '../../../services/booking.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { TimeFormatter } from '../../../services/format-time.service';

@Component({
  selector: 'stylist-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  providers: [CalendarUtils, DatePipe],
  templateUrl: './stylist-dashboard-component.html',
  styleUrl: './stylist-dashboard-component.css',
})
export class StylistDashboardComponent {
  // The currently logged-in stylist
  currentStylist: User;

  // Greeting message based on the time of day (e.g., Morning, Afternoon)
  greetingTime: string;

  // Holds all today's appointments for the stylist
  appointments: Appointment[] = [];

  // Dependency injection using Angular's `inject()` API
  authService = inject(UserAuthService);
  timeService = inject(TimeService);
  bookingService = inject(BookingService);
  timeFormatService = inject(TimeFormatter);

  //Calendar-related properties for displaying events
  viewDate: Date = new Date();
  view: string = 'month';

  //Sample event displayed in the calendar
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: "Today's Event",
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
    },
  ];

  /*
    Lifecycle hook that runs once component is initialized.
    - Fetches the currently logged-in stylist.
   - Sets up time-based greetings.
   - Loads today's appointments.
   */
  ngOnInit(): void {
    this.currentStylist = this.authService.currentUser.value;

    // Initialize greeting and refresh every minute to stay updated
    this.updateTimeOfDay();
    setInterval(() => {
      this.updateTimeOfDay();
    }, 60000);

    // Load today's appointments
    this.loadAppointment();
  }

  //  Updates the greeting message based on the current time.
  updateTimeOfDay() {
    this.greetingTime = this.timeService.getTimeOfDay();
  }

  /**
    Handles interactions with calendar events (future enhancement).
    @param action The action performed (e.g., clicked, edited).
    @param event The event data.
   */
  handleEvent(action: string, event: any): void {
    // Future feature: Open event details or take actions on click
  }

  /*
   Loads all appointments for the current stylist
   and filters them to include only today's appointments.
   */
  loadAppointment() {
    this.bookingService
      .getAllAppointmentsForStylist(this.currentStylist.bussinessName)
      .subscribe((appts) => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        // Reset appointments to prevent duplicates when reloading
        this.appointments = [];

        for (const apt of appts) {
          const apptDate = formatDate(apt.dateTime, 'yyyy-MM-dd', 'en-US');
          if (apptDate === today) {
            this.appointments.push(apt);
          }
        }
      });
  }

  //Formats the appointment time using the shared TimeFormatter service.
  formatTime(date: string) {
    return this.timeFormatService.formatTime(date);
  }

  //Returns confirmed appointments only
  get cornfirmedAppointments() {
    return this.appointments.filter((appt) => appt.status === 'confirmed');
  }

  //Returns pending appointments only.
  get pendingAppointments() {
    return this.appointments.filter((appt) => appt.status === 'pending');
  }

  //Returns rejected appointments only.
  get rejectedAppointments() {
    return this.appointments.filter((appt) => appt.status === 'rejected');
  }
}
