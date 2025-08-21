import { Component,  inject,  OnInit } from '@angular/core';
import Swiper from 'swiper';
import  { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { User } from '../../../../interfaces/interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserAuthService } from '../../../../services/user-auth-service';
import { Observable } from 'rxjs';


@Component({
  selector: 'stylist-details',
  standalone: true,
  imports: [],
  templateUrl: './stylist-details-component.html',
  styleUrl: './stylist-details-component.css'
})
export class StylistDetailsComponent implements OnInit{

  selectedStylist: User;

  searchId: number;
 
  stylists: User [];

  stylistService : UserAuthService = inject(UserAuthService);

  activeroute: ActivatedRoute = inject(ActivatedRoute);
  

  ngOnInit() {
    // implements swiper slides
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
      this.activeroute.paramMap.subscribe((data) =>{
      this.searchId = Number(data.get('id')); // gets the id of the current route

      // retrieves list of tylist from the database
      this.stylistService.getUsers().subscribe((data) =>{
      this.stylists = data;

      //returns stylist who's id matches the id of the current route
      this.selectedStylist = this.stylists.find(stylist => stylist.id === this.searchId) 

       })
      
      
    })
    
  }

  
}
