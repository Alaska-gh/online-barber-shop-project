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
  appointments: Appointment[] = []
  upcommingAppointments: Appointment[]=[];
  pastAppointments: Appointment[] = [];
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
    const today = new Date()
    this.pastAppointments = appts.filter(appt => new Date(`${appt.date}T${appt.time}`) < today && this.bookingService.apptHasEnded(appt))
    this.upcommingAppointments = appts.filter(appt => new Date(`${appt.date}T${appt.time}`) >= today && this.bookingService.apptHasEnded(appt))
    this.appointments = appts
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

 
  
  get cornfirmedAppointments(){
    return this.appointments.filter(appt => appt.status === 'confirmed')
  }

  get pendingAppointments(){
    return this.appointments.filter(appt => appt.status === 'pending')
  }

  get rejectedAppointments(){
    return this.appointments.filter(appt => appt.status === 'rejected')
  }
}
