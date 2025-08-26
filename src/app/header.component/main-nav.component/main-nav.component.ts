import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {  User } from '../../interfaces/interface';
import { UserAuthService } from '../../services/user-auth-service';

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

authService = inject(UserAuthService)
router: Router = inject(Router)


ngOnInit(): void {
  this.authService.logInState.subscribe((loggedIn) =>{
    this.isLoggedIn = loggedIn
  })
  this.authService.currentUser.subscribe((currentUser) =>{
    this.user = currentUser
  });
}


onLogoutClicked(event: Event){
  this.authService.logoutBtnCliked()
    event.preventDefault(); //preventing the default behaviur of the anchor element
}
}
