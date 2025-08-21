import { Component, inject, OnInit } from '@angular/core';
import { StylistAuthService } from '../../services/stylist-auth-service';
import { IDeactivateComponent, User } from '../../interfaces/interface';
import { StylistDashboardComponent } from './stylist-dashboard-component/stylist-dashboard-component';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [StylistDashboardComponent, RouterModule],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css'
})
export class StylistDashboardLayout{
  isLoggedIn: boolean;
  currentStylist: User;

  authService = inject(StylistAuthService)
  router: Router = inject(Router)

  ngOnInit(): void {
   this.isLoggedIn = this.authService.logInState.value
   console.log(this.isLoggedIn);
   this.authService.currentUser.subscribe((currentUser) => {
    this.currentStylist = currentUser
   })      
  }

   onLogOutClicked(event: Event){
    event.preventDefault(); //preventing the default behaviur of the anchor element
    this.authService.logoutStylist()
    this.router.navigate(['login']);
    alert(`You are logged out`)
  }

}
