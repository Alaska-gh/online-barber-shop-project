import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesService } from '../../../services/styles.service';
import { Services } from '../../../interfaces/services.interface';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'banner-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{
 style: Services[] = [];


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
    this.style = this.listOfStyles.getServices()
  }
}
