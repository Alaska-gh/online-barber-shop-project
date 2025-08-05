import { Component, AfterViewInit } from '@angular/core';
import { StylesService } from './styles.service';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay])

@Component({
  selector: 'styles-component',
  imports: [CommonModule],
  templateUrl: './styles.component.html',
  styleUrl: './styles.component.css'
})
export class StylesComponent implements AfterViewInit{

  styles
  constructor(){
  this.styles = new StylesService()
  } 
    ngAfterViewInit() {
    new Swiper('.swiper-container', 
      {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination:{
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          640: { slidesPerView: 1, navigation: false },
          768: { slidesPerView: 2, navigation: false},
          1024: { slidesPerView: 4, navigation: true}
        }
      }
    );
  }
}
