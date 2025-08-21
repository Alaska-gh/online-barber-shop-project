import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { Filter } from './filter/filter';
import { User } from '../../../interfaces/interface';
import { FilterService } from '../../../services/filter.service';
import { RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth-service';


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
  
}
