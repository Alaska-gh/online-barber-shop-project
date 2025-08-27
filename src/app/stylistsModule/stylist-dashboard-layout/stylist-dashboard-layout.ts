import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth-service';
import { StylistDashboardComponent } from './stylist-dashboard-component/stylist-dashboard-component';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmLogoutComponent } from '../../confirm-logout.component/confirm-logout.component';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [StylistDashboardComponent, RouterModule, ConfirmLogoutComponent],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css'
})
export class StylistDashboardLayout{
  // properties
  isLoggedIn: boolean;
  currentStylist: User;
  showConfirmLogout: boolean = false

  // instances
  authService = inject(UserAuthService)
  router: Router = inject(Router)

  // methods
  ngOnInit(): void {
   this.isLoggedIn = this.authService.logInState.value
   console.log(this.isLoggedIn);
   this.authService.currentUser.subscribe((currentUser) => {
    this.currentStylist = currentUser
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
}
