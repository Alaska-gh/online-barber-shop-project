import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../interfaces/appointment.interface';
import { BookingService } from '../../services/booking.service';
import { UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-appointments-component',
  imports: [CommonModule],
  templateUrl: './customer-appointments-component.html',
  styleUrl: './customer-appointments-component.css'
})
export class CustomerAppointmentsComponent implements OnInit{
 appointments: Appointment[] = []
 pastAppointments: Appointment[] = []
 upcommingAppointments: Appointment[] =[]
 currentUser: User;
 pollSub: Subscription

 bookingService: BookingService = inject(BookingService)
 authService: UserAuthService = inject(UserAuthService)

ngOnInit(): void {
  this.currentUser = this.authService.currentUser.value
  this.loadAppointments()

  this.pollSub = interval(1000).subscribe(()=>{
    this.loadAppointments()
  })
}

ngOnDestroy(){
  this.pollSub.unsubscribe()
}

 loadAppointments(){
  this.bookingService.getAppointmentsByCustomer(this.currentUser.email).subscribe(data => {
    const today = new Date()
    this.appointments = data
    this.pastAppointments = data.filter(date => new Date(`${date.date}T${date.time}`) < today)
    this.upcommingAppointments = data.filter(date => new Date(`${date.date}T${date.time}`) >= today)
  })
  console.log(this.appointments);
  console.log(this.currentUser);
 }


 get confirmedAppointments(){
   return this.upcommingAppointments.filter(appt => appt.status === 'confirmed')
 }
 get rejectedAppointments(){
   return this.upcommingAppointments.filter(appt => appt.status === 'rejected')
 }
 get pendingAppointments(){
   return this.upcommingAppointments.filter(appt => appt.status === 'pending')
 }
}
