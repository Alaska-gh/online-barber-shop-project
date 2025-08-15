import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'top-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent implements OnInit{
  // LIST OF ICONS 
  iconList: string[] = ["fab fa-facebook","fab fa-twitter","fab fa-instagram","fab fa-tiktok"]


  activeRoute: ActivatedRoute = inject(ActivatedRoute);

 ngOnInit(): void {
   this.activeRoute.fragment.subscribe((data) =>{
    this.jumpToSection(data)
   })
 }

 jumpToSection(section){
  document.getElementById(section).scrollIntoView({behavior: 'smooth'})
 }
}
