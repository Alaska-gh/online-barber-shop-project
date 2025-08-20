import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'advert-component',
  imports: [CommonModule],
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.css'
})
export class AdvertComponent {
 
  // GENERATING THE CONTENT FOR THE LI ELEMENT
  advertList: string [] = [
    'Expert Stylists - Trained in the latest techniques and trends',
    'Premium Products - Only high-quality, nourishing formulas',
    'Luxurious Experience - Relax in our serene, stylish environment',
    'Customized Services - Tailored to enhance your natural beauty'
  ]
}
