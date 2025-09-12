import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponent {
  /*
    Emits an event whenever the logout button is clicked.
    Components that subscribe to this can show a logout confirmation modal.
   */
  logoutBtnClickedEvent = new Subject<boolean>();

  /*
    Emits an event whenever the login button is clicked.
   Components can subscribe to show/hide the login form dynamically.
   */
  loginBtnClickedEvent = new Subject<boolean>();

  /*
    Emits an event whenever the signup button is clicked.
    Components can subscribe to show/hide the signup form dynamically.
   */
  signupBtnClickedEvent = new Subject<boolean>();

  /*
    Triggers the logout event.
    Typically used in navbars or logout buttons to open a confirmation dialog.
   */
  logoutBtnCliked() {
    this.logoutBtnClickedEvent.next(true);
  }

  /*
    Triggers the login event and optionally passes a boolean
   to control showing/hiding the login form.
   */
  loginBtnClicked(value: boolean) {
    this.loginBtnClickedEvent.next(value);
  }

  /*
   Triggers the signup event and optionally passes a boolean
    to control showing/hiding the signup form.
   */
  signupBtnClicked(value: boolean) {
    this.signupBtnClickedEvent.next(value);
  }
}
