import { AuthService } from './../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Stylist } from '../../interfaces/interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'main-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit{

authService = inject(AuthService)

isLoggedIn: boolean;

currentStylist: Stylist;

ngOnInit(): void {
  this.authService.logInState.subscribe((state) =>{
    this.isLoggedIn = state

    this.currentStylist = this.authService.matchingStylist
  })
}
}
