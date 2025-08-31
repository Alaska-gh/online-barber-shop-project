import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth-service';
import { TimeService } from '../../../services/timeOfDay.service';
import { CalendarEvent, CalendarModule, CalendarUtils } from 'angular-calendar';
import { User } from '../../../interfaces/user.interface';
import { BookingService } from '../../../services/booking.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'stylist-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  providers: [
    CalendarUtils
  ],
  templateUrl: './stylist-dashboard-component.html',
  styleUrl: './stylist-dashboard-component.css'
})
export class StylistDashboardComponent {
  currentStylist: User;
  greetingTime: string;
  appointments: Appointment[] = [];
  private pollSub!: Subscription

  authService = inject(UserAuthService)
  timeService = inject(TimeService)
  bookingService = inject(BookingService)

  viewDate: Date = new Date()
  view: string = 'month'
  events: CalendarEvent[] = [
      {
      start: new Date(),
      title: 'Today\'s Event',
      color: {
         primary: '#1e90ff', 
         secondary: '#D1E8FF' 
        },
    }
  ]

  ngOnInit(): void {    
    this.currentStylist = this.authService.currentUser.value // getting the logged in stylist

    this.updateTimeOfDay()
    setInterval(()=>{
      this.updateTimeOfDay() //updating the time every 1 minute
    }, 60000);

    this.loadAppointment()

    this.pollSub = interval(10000).subscribe(() =>{
      this.loadAppointment()
    })
}
ngOnDestroy(){
  if(this.pollSub) this.pollSub.unsubscribe()
}

  updateTimeOfDay(){
  this.greetingTime = this.timeService.getTimeOfDay()
  }

   handleEvent(action: string, event: any): void {
    // Handle event
  }


  loadAppointment(){
    this.bookingService.getAllAppointmentsForStylist(this.currentStylist.bussinessName).subscribe( data => {
      this.appointments = data
    })
  }


  get cornfirmedAppointments(){
    return this.appointments.filter(appt => appt.status === 'confirmed')
  }

  get pendingAppointments(){
    return this.appointments.filter(appt => appt.status === 'pending')
  }

  get rejectedAppointments(){
    return this.appointments.filter(appt => appt.status === 'rejected')
  }

  confirmAppointment(id: number){
    this.bookingService.updateAppointmentStatus(id, 'confirmed');
    this.loadAppointment()
  }


  rejectAppointment(id: number){
    this.bookingService.updateAppointmentStatus(id, 'rejected');
    this.loadAppointment()
  }

}

