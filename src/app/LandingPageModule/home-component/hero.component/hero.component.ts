import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth-service';
import { DynamicComponent } from '../../../services/dynamicComponent.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hero-section',
  imports: [RouterModule, TranslateModule],
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
