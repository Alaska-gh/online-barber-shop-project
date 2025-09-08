import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserAuthService } from '../../services/user-auth-service';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { interval, Subscription } from 'rxjs';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'main-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})
export class MainNavComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean;
  user: User;
  ongoingAppointments: Appointment[] = [];

  authService = inject(UserAuthService);
  router: Router = inject(Router);
  bookingService = inject(BookingService);
  dynamicComponent = inject(DynamicComponent);
  pollSub: Subscription;

  @ViewChild('navBarToggle', { static: true }) toggleNavBarEl!: ElementRef;
  private collapse: Collapse;

  ngOnInit(): void {
    this.authService.logInState.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
    });

    this.pollSub = interval(1000).subscribe(() => {
      this.loadAppointments();
    });
  }

  ngAfterViewInit() {
    this.collapse = new Collapse(this.toggleNavBarEl.nativeElement, {
      toggle: false,
    });
  }

  toggleNavBar() {
    this.collapse.toggle();
  }

  closeNavBar() {
    this.collapse.hide();
  }

  loadAppointments() {
    this.bookingService
      .getAppointmentsByCustomer(this.user.email)
      .subscribe((appts) => {
        const today = new Date();
        this.ongoingAppointments = appts.filter(
          (appt) =>
            new Date(`${appt.date}T${appt.time}`) >= today &&
            !this.bookingService.apptHasEnded(appt)
        );
      });
  }

  onLogoutClicked(event: Event) {
    this.dynamicComponent.logoutBtnCliked();
    event.preventDefault(); //preventing the default behaviur of the anchor element
  }

  onLoginButtonClicked(event: boolean) {
    this.dynamicComponent.loginBtnClicked(event);
  }

  onSignupBtnClicked(value: boolean) {
    this.dynamicComponent.signupBtnClicked(value);
  }
}
