import { Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;
@Component({
  selector: 'main-nav',
  imports: [CommonModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent{
  // LIST OF NAVIGATION ITEMS
  mainNavItems: string[] =[ 'About', 'Styles and Services']

  link: string = ''

  showMessage(){
    alert('Hi Please Hold on!!! we are working on this feature')
  }
 

  @Output() signupEvent = new EventEmitter<string>();


  onStylistBtnClicked(){
    this.link = 'stylist'
    this.signupEvent.emit(this.link)
  }

  onSignupBtnClicked(){
    this.link = 'signup'
    this.signupEvent.emit(this.link)
  }

  onHomeBtnCliked(){
    this.link = 'home'
    this.signupEvent.emit(this.link)
  }
}
