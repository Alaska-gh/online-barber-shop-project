import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { StylesService } from '../styles.service';

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
    // CREATING INSTANCE OF THE SERVICE CLASS TO GET ACCESS TO THE PROPERTIES
  this.styles = new StylesService()
  } 
  // SWIPER CONFIGURATIONS
    ngAfterViewInit() {
    new Swiper('.swiper-container', 
      {
        modules: [Pagination, Navigation, Autoplay, Scrollbar],
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // scrollbar:{
        //   hide: true,
        //   draggable: false
        // },
        speed: 3000,
        pagination:{
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          0: { slidesPerView: 1},
          768: { slidesPerView: 2},
          1024: { slidesPerView: 4}
        }
      }
    );
  }
}
