import { Component, inject } from '@angular/core';
import { Stylist, StylistService } from '../../../../shared/stylist-service';

@Component({
  selector: 'men-stylist',
  imports: [],
  templateUrl: './men-stylist-component.html',
  styleUrl: './men-stylist-component.css'
})
export class MenStylistComponent {
  listOfMenStylists: Stylist [] = []

  loadStylist = inject(StylistService)
  ngOnInit(){
    this.listOfMenStylists = this.loadStylist.getMenStylist()
  }
}
