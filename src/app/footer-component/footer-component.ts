import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Footer, FooterService } from './footer-service';

@Component({
  selector: 'footer-component',
  imports: [CommonModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent implements OnInit{
  // CREATING A LIST OF TITLES FOR USE IN THE TEMPLATE
 listOfTitles: Footer[] = []

 listOfLinks = inject(FooterService)

 ngOnInit(): void {
   this.listOfTitles = this.listOfLinks.getList();
   
 }
}
