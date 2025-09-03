import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth-service';
import { StylistDashboardComponent } from './stylist-dashboard-component/stylist-dashboard-component';
import { Router, RouterModule } from '@angular/router';
import { ConfirmLogoutComponent } from '../../confirm-logout.component/confirm-logout.component';
import { User } from '../../interfaces/user.interface';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [RouterModule, ConfirmLogoutComponent],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css'
})
export class StylistDashboardLayout{
  // properties
  isLoggedIn: boolean;
  currentStylist: User;
  showConfirmLogout: boolean = false
  appointments: Appointment[] = []

  // instances
  authService = inject(UserAuthService)
  router: Router = inject(Router)
  bookingService = inject(BookingService)
  pollSub: Subscription

  // methods
  ngOnInit(): void {
   this.isLoggedIn = this.authService.logInState.value
   this.authService.currentUser.subscribe((currentUser) => {
    this.currentStylist = currentUser
   })    
   
   this.pollSub = interval(1000).subscribe(()=>{
    this.loadAppointments()
   })
  }


  loadAppointments(){
    this.bookingService.getAllAppointmentsForStylist(this.currentStylist.bussinessName).subscribe(appts => {
      this.appointments = appts
    })
  }
   onLogOutClicked(event: Event){
    event.preventDefault(); //preventing the default behaviur of the anchor element
    this.showConfirmLogout = true
  }


  confirmLogout(value: boolean){
    this.showConfirmLogout = false
    if(value){
      this.authService.logoutStylist();
      this.router.navigate(['login'])
    }
  }

  get pendingAppointments(){
    return this.appointments.filter(appt => appt.status === 'pending')
  }
}
