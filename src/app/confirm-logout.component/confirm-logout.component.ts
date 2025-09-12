import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'confirm-logout',
  imports: [],
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.css',
})
export class ConfirmLogoutComponent {
  /*
   Emits a boolean value indicating whether the user confirmed (true)
    or canceled (false) the logout action.
    Parent components can subscribe to this event to handle logout logic.
   */
  @Output() confirmLogoutEvent = new EventEmitter<boolean>();

  // Triggered when the user clicks either "Confirm" or "Cancel".
  confirmLogout(val: boolean) {
    this.confirmLogoutEvent.emit(val);
  }
}
