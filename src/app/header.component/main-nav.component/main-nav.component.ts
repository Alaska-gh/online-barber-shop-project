import { Component } from '@angular/core';

@Component({
  selector: 'main-nav',
  imports: [],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {

  showMessage(){
    alert('Hi Please Hold on!!! we are working on this feature')
  }
}
