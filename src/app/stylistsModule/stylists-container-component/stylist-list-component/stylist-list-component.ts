import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { Filter } from './filter/filter';
import { Stylist } from '../../../interfaces/interface';
import { FilterService } from '../../../services/filter.service';
import { RouterModule } from '@angular/router';
import { StylistAuthService } from '../../../services/stylist-auth-service';


@Component({
  selector: 'stylist-list',
  imports: [Filter, RouterModule],
  templateUrl: './stylist-list-component.html',
  styleUrl: './stylist-list-component.css'
})
export class StylistListComponent implements OnInit{
   
  selectedStylist: string = 'all';

  listOfStylists: Stylist[] = []

  filterService = inject(FilterService)

  stylistService = inject(StylistAuthService)

  ngOnInit(): void {
     this.stylistService.getStylist().subscribe((data) =>{
      this.listOfStylists = data
     });

    this.filterService.selectedBtnEvent.subscribe((value) =>{
      this.selectedStylist = value;
    })
  }
}
