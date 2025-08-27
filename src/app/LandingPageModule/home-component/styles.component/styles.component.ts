import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { StylesService } from '../../../services/styles.service';
import { Services } from '../../../interfaces/services.interface';

Swiper.use([Navigation, Pagination, Autoplay, Scrollbar])

@Component({
  selector: 'styles-component',
  imports: [CommonModule],
  templateUrl: './styles.component.html',
  styleUrl: './styles.component.css'
})
export class StylesComponent implements OnInit{

  styles: Services[] = [];

  stylesService = inject(StylesService)

   ngOnInit(): void {
    this.styles = this.stylesService.getServices(); // fetching the list of styles from the styles service

    // implementing swiper sliders
     new Swiper('.swiper-container', 
      {
        modules: [Pagination, Navigation, Autoplay, Scrollbar],
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
       
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
      })
    
   }

  
}
