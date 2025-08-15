import { Component,  inject,  OnDestroy,  OnInit } from '@angular/core';
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
  
  paramMapsObservable;

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
      // using paramMaps observable to get the curent active route parameter to check if the id matches any of the urls.
      this.paramMapsObservable = this.activeroute.paramMap.subscribe((data) =>{
      this.searchId = Number(data.get('id'));
      this.stylists = this.stylistService.getStylist()
      this.selectedStylist = this.stylists.find(stylist => stylist.id === this.searchId) 
    })
    
  }

  
}
