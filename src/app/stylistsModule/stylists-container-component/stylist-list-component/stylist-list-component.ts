import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { Filter } from './filter/filter';
import { Stylist } from '../../../interfaces/interface';
import { StylistService } from '../../../services/stylist-service';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'stylist-list',
  imports: [Filter],
  templateUrl: './stylist-list-component.html',
  styleUrl: './stylist-list-component.css'
})
export class StylistListComponent implements OnInit{
   
  selectedStylist: string = 'all';

  listOfStylists: Stylist[] = []

  filterService = inject(FilterService)

  stylistService = inject(StylistService)

  ngOnInit(): void {
    this.listOfStylists = this.stylistService.getStylist();

    this.filterService.selectedBtnEvent.subscribe((value) =>{
      this.selectedStylist = value;
    })
  }
}
