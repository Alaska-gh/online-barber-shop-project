import { CommonModule } from '@angular/common';
import { Component, AfterViewInit} from '@angular/core';
import Swiper from 'swiper';
import  { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { StarredBarbersService } from './starred-barbers.service';


@Component({
  selector: 'starred-barbers',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './starred-barbers.component.html',
  styleUrl: './starred-barbers.component.css'
})
export class StarredBarbersComponent implements AfterViewInit {
  cardItem;
  socialLinks = ["fab fa-facebook", "fab fa-twitter", "fab fa-instagram","fab fa-tiktok"]
 constructor(){
   this.cardItem = new StarredBarbersService()
 }

  ngAfterViewInit() {
   setTimeout(()=>{
       new Swiper('.barbers-swiper-container', 
      {
        modules: [Pagination, Navigation, Autoplay, Scrollbar],
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        spaceBetween: 20,
       
        pagination:{
          el: '.barbers-swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          0: { slidesPerView: 1},
          768: { slidesPerView: 2},
          1024: { slidesPerView: 3}
        }
      }
    );
   })
  }
}
