import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IDeactivateComponent, User } from '../../interfaces/interface';
import { UserAuthService } from '../../services/user-auth-service';
import { Observable } from 'rxjs';

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
    event.preventDefault(); //preventing the default behaviur of the anchor element
    this.authService.logoutStylist()
    this.router.navigate(['login']);
    alert(`You are logged out`)
}



}
