import { Component, inject, OnInit } from '@angular/core';
import { StylistAuthService } from '../../services/stylist-auth-service';
import { Stylist } from '../../interfaces/interface';
import { StylistDashboardComponent } from './stylist-dashboard-component/stylist-dashboard-component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'stylist-dashboard-layout',
  imports: [StylistDashboardComponent, RouterModule],
  templateUrl: './stylist-dashboard-layout.html',
  styleUrl: './stylist-dashboard-layout.css'
})
export class StylistDashboardLayout implements OnInit{

  isLoggedIn: boolean = false;
  currentStylist: Stylist;

  authService = inject(StylistAuthService)
  router: Router = inject(Router)

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthorised();

    this.currentStylist = this.authService.loggedInUser
  }

  onLogOutClicked(event: Event){
    event.preventDefault(); //preventing the default behaviur of the anchor element

    this.authService.logout()

    this.router.navigate(['home']);

    alert(`logged out ${this.authService.isLoggedIn}`)
  }
}
