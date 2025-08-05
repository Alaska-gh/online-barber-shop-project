import { Component, AfterViewInit } from '@angular/core';
import { StylesService } from './styles.service';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay, Scrollbar])

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
        modules: [Pagination, Navigation, Autoplay, Scrollbar],
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        scrollbar:{
          hide: true,
          draggable: false
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
          0: { slidesPerView: 1, navigation: false },
          768: { slidesPerView: 2, navigation: false},
          1024: { slidesPerView: 4, navigation: true}
        }
      }
    );
  }
}
