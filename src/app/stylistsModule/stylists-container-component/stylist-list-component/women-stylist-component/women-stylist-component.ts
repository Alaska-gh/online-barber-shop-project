import { Component, inject } from '@angular/core';
import { Stylist, StylistService } from '../../../../services/stylist-service';

@Component({
  selector: 'women-stylist',
  imports: [],
  templateUrl: './women-stylist-component.html',
  styleUrl: './women-stylist-component.css'
})
export class WomenStylistComponent {

  
  listOfWomenStylists: Stylist [] = []
  
  
  loadStylist = inject(StylistService)

  ngOnInit(){
    
    this.listOfWomenStylists = this.loadStylist.getWomenStylist()
  }
}
