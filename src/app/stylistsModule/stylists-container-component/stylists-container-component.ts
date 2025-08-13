import { Component, inject } from '@angular/core';
import { StylistListComponent } from './stylist-list-component/stylist-list-component';
import { StylistProfileComponent } from './stylist-profile-component/stylist-profile-component';

@Component({
  selector: 'stylists-container',
  imports: [StylistListComponent],
  templateUrl: './stylists-container-component.html',
  styleUrl: './stylists-container-component.css'
})
export class StylistsContainerComponent {



}
