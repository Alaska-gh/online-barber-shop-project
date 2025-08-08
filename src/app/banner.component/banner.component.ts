import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesService } from '../styles.service';

@Component({
  selector: 'banner-component',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
 style;
 constructor(){
  // creating an instance of the style service class to get access to the properties
  this.style = new StylesService()
 }
}
