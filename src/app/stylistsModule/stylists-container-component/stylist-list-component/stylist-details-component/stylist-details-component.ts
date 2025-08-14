import { Component,  inject,  OnInit } from '@angular/core';
import Swiper from 'swiper';
import  { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Stylist } from '../../../../interfaces/interface';
import { StylistService } from '../../../../services/stylist-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'stylist-details',
  standalone: true,
  imports: [],
  templateUrl: './stylist-details-component.html',
  styleUrl: './stylist-details-component.css'
})
export class StylistDetailsComponent implements OnInit{

  selectedStylist: Stylist;

  searchId: number;
 
  stylists: Stylist [];

  stylistService : StylistService = inject(StylistService);

  activeroute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
     new Swiper('.portfolio-swiper-container', {
      modules:[Pagination, Navigation, Autoplay],
      loop: true,
      autoplay: true,
      spaceBetween: 20,
      navigation:{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
       pagination:{
          el: '.swiper-pagination',
          clickable: true
        },
      breakpoints:{
         0: { slidesPerView: 1},
          768: { slidesPerView: 2},
          1024: { slidesPerView: 2}
      }
    })
    
    this.searchId = Number(this.activeroute.snapshot.paramMap.get('id'))
    this.stylists = this.stylistService.getStylist()  
    this.selectedStylist = this.stylists.find(stylist => stylist.id === this.searchId) 

    console.log(this.selectedStylist);
    
  }
  
}
