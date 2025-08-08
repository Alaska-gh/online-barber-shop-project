import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'main-nav',
  imports: [CommonModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  // LIST OF NAVIGATION ITEMS
  mainNavItems: string[] =['Home','Services', 'About', 'Serve With Us', 'Signup / Login']
  // A SIMPLE ALERT MESSAGE TO SHOW THE LINKS WORKS
  showMessage(){
    alert('Hi Please Hold on!!! we are working on this feature')
  }
}
