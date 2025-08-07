import { Component, AfterViewInit} from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/modules';
import { ClientFeedbackService } from './client-feedback-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'client-feedback',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './client-feedback-component.html',
  styleUrl: './client-feedback-component.css'
})
export class ClientFeedbackComponent implements AfterViewInit{
  details = new ClientFeedbackService();

  ngAfterViewInit() {
    new Swiper('.client-swiper-container', {
      modules: [Pagination, Navigation, Autoplay, Scrollbar],

      loop: true,

      pagination: {
        el: '.client-swiper-pagination',
        clickable: true
      },
      autoplay:{
        delay: 2000,
        disableOnInteraction: false
      },
      spaceBetween: 20,
      navigation:{
        prevEl: '.client-swiper-button-prev',
        nextEl: '.client-swiper-button-next',
      },
      breakpoints:{
       
      }
    })
  }
}
