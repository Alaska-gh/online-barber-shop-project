import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'top-nav',
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  // LIST OF ICONS 
  iconList: string[] = ["fab fa-facebook","fab fa-twitter","fab fa-instagram","fab fa-tiktok"]
}
