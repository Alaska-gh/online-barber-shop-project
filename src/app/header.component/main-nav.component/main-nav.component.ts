import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserAuthService } from '../../services/user-auth-service';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';

@Component({
  selector: 'main-nav',
  imports: [CommonModule, RouterModule,
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent{
isLoggedIn: boolean ;
user: User;
appointments: Appointment[] = []


authService = inject(UserAuthService)
router: Router = inject(Router)
bookingService = inject(BookingService)

ngOnInit(): void {
  this.authService.logInState.subscribe((loggedIn) =>{
    this.isLoggedIn = loggedIn
  })
  this.authService.currentUser.subscribe((currentUser) =>{
    this.user = currentUser
  });

  this.loadAppointments()
}

loadAppointments(){
  this.bookingService.getAppointmentsByCustomer(this.user.email).subscribe(data => {
    const today = new Date()
    this.appointments = data.filter(date => new Date(`${date.date}T${date.time}`) >= today)
  })
 
  
}

onLogoutClicked(event: Event){
  this.authService.logoutBtnCliked()
    event.preventDefault(); //preventing the default behaviur of the anchor element
}

}
