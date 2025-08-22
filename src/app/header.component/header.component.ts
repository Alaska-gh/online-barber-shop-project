import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MainNavComponent } from './main-nav.component/main-nav.component';
import { TopNavComponent } from "./top-nav.component/top-nav.component";
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
// import 'bootstrap';
@Component({
  selector: 'header-component',
  imports: [MainNavComponent, TopNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

 currentRoute: string
 activeRoute: Router = inject(Router);


  ngOnInit(): void {   
    this.activeRoute.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) =>{
        this.currentRoute = event.urlAfterRedirects;
        
      })
  }

  @Output() btnClickedEvent = new EventEmitter<boolean>()
  btnClicked(value){
    this.btnClickedEvent.emit(value)
  }
}
