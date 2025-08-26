import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'confirm-logout',
  imports: [],
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.css'
})
export class ConfirmLogoutComponent {
  @Output() confirmLogoutEvent = new EventEmitter<boolean>()
  confirmLogout(val: boolean){
    this.confirmLogoutEvent.emit(val)
  }
}
