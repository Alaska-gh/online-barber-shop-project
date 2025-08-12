import { Component} from '@angular/core';
import { Filter } from './filter/filter';
import { WomenStylistComponent } from './women-stylist-component/women-stylist-component';
import { MenStylistComponent } from './men-stylist-component/men-stylist-component';

@Component({
  selector: 'stylist-list',
  imports: [Filter, WomenStylistComponent,MenStylistComponent],
  templateUrl: './stylist-list-component.html',
  styleUrl: './stylist-list-component.css'
})
export class StylistListComponent {
   
  selectedStylist: string;

  recieveBtnChage(value: string){
    this.selectedStylist = value
    
    
  }

 
  
}
