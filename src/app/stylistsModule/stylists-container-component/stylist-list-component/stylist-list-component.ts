import { Component, inject, OnInit} from '@angular/core';
import { Filter } from './filter/filter';
import { FilterService } from '../../../services/filter.service';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth-service';
import { User } from '../../../interfaces/user.interface';
import { BookingService } from '../../../services/booking.service';


@Component({
  selector: 'stylist-list',
  imports: [Filter, RouterModule],
  templateUrl: './stylist-list-component.html',
  styleUrl: './stylist-list-component.css'
})
export class StylistListComponent implements OnInit{
  selectedStylist: string = 'all';
  listOfStylists: User[] = []

  filterService = inject(FilterService)
  stylistService = inject(UserAuthService)
  bookingService = inject(BookingService)
  router: Router = inject(Router)

  ngOnInit(): void {
    // retrieves list of stylist from the database
     this.stylistService.getUsers().subscribe((data) =>{
       this.listOfStylists = data.filter(user => user.role === 'stylist');
      console.log(this.listOfStylists);
     });
    //  listening to the changes when the value of the radio button change
    this.filterService.selectedBtnEvent.subscribe((value) =>{
      this.selectedStylist = value; 
    })
  }
  
  chooseStylist(stylist: User){
    this.bookingService.setStylist(stylist);
    this.router.navigate(['/booking'])
  }
}
