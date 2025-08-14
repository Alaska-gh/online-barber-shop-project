import { CardDetails } from './../../../interfaces/interface';
import { Component, AfterViewInit, OnInit, inject} from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { ClientFeedbackService} from './client-feedback-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'client-feedback',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './client-feedback-component.html',
  styleUrl: './client-feedback-component.css'
})
export class ClientFeedbackComponent implements OnInit{
  // CREATING AN INSTANCE OF THE CLIENTFEEDBACKSERVICE
  details: CardDetails[] = [];

  detailsCard = inject(ClientFeedbackService);

  // SWIPER CONFIGURRATIONS

  ngOnInit() {
    this.details = this.detailsCard.getCardDetails();
    
    new Swiper('.client-swiper-container', {
      modules: [Pagination, Navigation, Autoplay, Scrollbar],

      loop: true,
      speed: 3000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay:{
        delay: 2000,
        disableOnInteraction: false
      },
      spaceBetween: 20,
      navigation:{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
     
    })
  }
}
