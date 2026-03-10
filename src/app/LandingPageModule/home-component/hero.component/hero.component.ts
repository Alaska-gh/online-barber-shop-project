import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth-service';
import { DynamicComponent } from '../../../services/dynamicComponent.service';

@Component({
  selector: 'hero-section',
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  constructor(
    private authService: UserAuthService,
    private dynamicComponent: DynamicComponent,
    private router: Router
  ) { }
  
  bookAppointment() {
    this.authService.redirectUrl = '/booking'; // save intended route
    const isLoggedIn = this.authService.logInState.value;

    if (!isLoggedIn) {
      this.dynamicComponent.loginBtnClicked(true); // open modal
      return;
    }

    this.router.navigate(['/booking']);
  }
}
