import { StarredBarbersService } from './../../../services/starred-barbers.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import Swiper from 'swiper';
import  { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { CardDetails } from '../../../interfaces/footer.interface';


@Component({
  selector: 'starred-barbers',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './starred-barbers.component.html',
  styleUrl: './starred-barbers.component.css'
})
export class StarredBarbersComponent implements OnInit {
  cardItem: CardDetails[] = [];
  // A LIST OF ICONS
  socialLinks = ["fab fa-facebook", "fab fa-twitter", "fab fa-instagram","fab fa-tiktok"]


  // GETING THE CARD DATA FROM THE STARREDBARBERSSERVICE
   cardItemDetails = inject(StarredBarbersService)
 

//  SWIPER CONFIURATIONS
  ngOnInit() {
    this.cardItem = this.cardItemDetails.getCardItem(); // getting card details from the starred barbers service

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
