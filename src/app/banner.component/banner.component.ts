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
  this.style = new StylesService()
 }
}
