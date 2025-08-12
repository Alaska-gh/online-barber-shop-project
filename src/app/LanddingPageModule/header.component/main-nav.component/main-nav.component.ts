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
  mainNavItems: string[] =['Home', 'About', 'Styles and Services']

  signupClicked: boolean = false; 

  showStylistPage: boolean = false;
  
  showMessage(){
    alert('Hi Please Hold on!!! we are working on this feature')
  }
 
  @ViewChild('stylist') stylistEl: ElementRef
  @ViewChild('signup') signupEl: ElementRef



  @Output() signupEvent = new EventEmitter<boolean>();


  onChanged(event: Event){
    event.preventDefault();
    // console.log(event.target);
    // console.log(this.stylistEl.nativeElement);
    if(event.target === this.stylistEl.nativeElement){
      this.showStylistPage = !this.showStylistPage
      this.signupEvent.emit(this.showStylistPage)
    }else if(event.target === this.signupEl.nativeElement){
      this.signupClicked = !this.signupClicked
      this.signupEvent.emit(this.signupClicked)
    }
    
  }


  // showStylistPage(value: Event){
  //   this.stylistBtnClicked = !this.stylistBtnClicked;
  //   this.signupEvent.emit(this.stylistBtnClicked)
  //   console.log(value);
    
  // }
}
