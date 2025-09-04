import { BookingService } from './../../../services/booking.service';
import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment.interface';
import { User } from '../../../interfaces/user.interface';
import { UserAuthService } from '../../../services/user-auth-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-stylist-appointment-component',
  imports: [CommonModule],
  templateUrl: './stylist-appointment-component.html',
  styleUrl: './stylist-appointment-component.css'
})
export class StylistAppointmentComponent implements OnInit{
  currentStylist: User;
  todaysAppointment: Appointment[] = []
  currentAppointments: Appointment[]=[];
  pastAppointments: Appointment[] = [];
  button: string = 'pending';
  private pollSub: Subscription


  bookingService = inject(BookingService);
  authService = inject(UserAuthService)
  toastr = inject(ToastrService)


  ngOnInit(): void {
    this.currentStylist = this.authService.currentUser.value
    this.loadAppointments()   
    
    this.pollSub = interval(1000).subscribe(()=>{
      this.loadAppointments()
    })
  }


  ngOnDestroy(){
    this.pollSub.unsubscribe()
  }
 loadAppointments(){
  this.bookingService.getAllAppointmentsForStylist(this.currentStylist.bussinessName).subscribe(appts =>{
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    this.pastAppointments = appts.filter(appt => new Date(`${appt.date}T${appt.time}`) < now && this.bookingService.apptHasEnded(appt))
    this.currentAppointments = appts.filter(appt => new Date(`${appt.date}T${appt.time}`) >= now && this.bookingService.apptHasEnded(appt))
    this.todaysAppointment = appts.filter(appt => appt.date === today)
  })
 }

   confirmAppointment(id: number){
    this.bookingService.updateAppointmentStatus(id, 'confirmed').subscribe(
      {
        next: ()=>{
          this.loadAppointments();
          this.toastr.success('Appointment Confirmed', 'Confirmed')
        },
        error(err){
        
        }
      }
    )
  
  }
  rejectAppointment(id: number){
    this.bookingService.updateAppointmentStatus(id, 'rejected').subscribe(
      {
        next:()=>{
          this.loadAppointments();
          this.toastr.error(`You've Cancelled the appointment`)
        },
        error(err){
        }
      }
    )
      
  }

 switchTo(event: Event){
  const btn = event.target as HTMLButtonElement
  this.button = btn.value
 }
  
  get cornfirmedAppointments(){
    return this.todaysAppointment.filter(appt => appt.status === 'confirmed')
  }

  get pendingAppointments(){
    return this.todaysAppointment.filter(appt => appt.status === 'pending')
  }

  get rejectedAppointments(){
    return this.todaysAppointment.filter(appt => appt.status === 'rejected')
  }
}
