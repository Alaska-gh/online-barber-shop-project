import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponent {
  logoutBtnClickedEvent = new Subject<boolean>();
  loginBtnClickedEvent = new Subject<boolean>();
  signupBtnClickedEvent = new Subject<boolean>();

  logoutBtnCliked() {
    this.logoutBtnClickedEvent.next(true);
  }

  loginBtnClicked(value: boolean) {
    this.loginBtnClickedEvent.next(value);
  }

  signupBtnClicked(value: boolean) {
    this.signupBtnClickedEvent.next(value);
  }
}
