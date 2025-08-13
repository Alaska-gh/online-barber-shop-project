import { Component, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';

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
 
  navService = inject(NavigationService)

  // when stylist link is clicked
  onStylistBtnClicked(){
    this.link = 'stylist'
    this.navService.onNavLinkChanged(this.link)
  }

  // when signup link is clicked
  onSignupBtnClicked(){
    this.link = 'signup'
    this.navService.onNavLinkChanged(this.link)
  }

  // when home link is clicked
  onHomeBtnCliked(){
    this.link = 'home'
    this.navService.onNavLinkChanged(this.link)
  }
}
