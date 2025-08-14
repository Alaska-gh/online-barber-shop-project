import { Component, EventEmitter, Output} from '@angular/core';
import { MainNavComponent } from './main-nav.component/main-nav.component';
import { TopNavComponent } from "./top-nav.component/top-nav.component";
// import 'bootstrap';
@Component({
  selector: 'header-component',
  imports: [MainNavComponent, TopNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

 

}
