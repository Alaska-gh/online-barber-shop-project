import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Styles, StylesService } from '../styles.service';

@Component({
  selector: 'banner-component',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{
 style: Styles[] = [];


 wrkHrs = [
  {
    days: 'Monday - Friday',
    hrs: '8am - 5pm'
 },
  {
    days: 'Saturday',
    hrs: '12pm - 8pm'
 },
  {
    days: 'Sunday',
    hrs: '12pm - 8pm'
 },

]
 listOfStyles = inject(StylesService)

  ngOnInit(): void {
    this.style = this.listOfStyles.getStyles()
  }
}
