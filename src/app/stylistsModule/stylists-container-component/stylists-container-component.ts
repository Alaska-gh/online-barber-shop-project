import { Component, inject } from '@angular/core';
import { StylistListComponent } from './stylist-list-component/stylist-list-component';

@Component({
  selector: 'stylists-container',
  imports: [StylistListComponent],
  templateUrl: './stylists-container-component.html',
  styleUrl: './stylists-container-component.css'
})
export class StylistsContainerComponent {

}
