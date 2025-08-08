import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterService } from './footer-service';

@Component({
  selector: 'footer-component',
  imports: [CommonModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {
  // CREATING A LIST OF TITLES FOR USE IN THE TEMPLATE
 listOfTitles = ['Links', 'Business Hours', 'Company', 'Contact']

 listOfLinks = new FooterService()
}
