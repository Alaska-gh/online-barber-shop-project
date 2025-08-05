import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'advert-component',
  imports: [CommonModule],
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.css'
})
export class AdvertComponent {
  paragraphText = `Our expert stylists and aestheticians are dedicated to providing top-tier hair, skin, and nail services tailored to your individual needs. Whether you're looking for a bold new haircut, a rejuvenating facial, or flawless nail artistry, we combine the latest trends with personalized care to ensure you leave feeling confident and refreshed.`
  advertList: string [] = [
    'Expert Stylists - Trained in the latest techniques and trends',
    'Premium Products - Only high-quality, nourishing formulas',
    'Luxurious Experience - Relax in our serene, stylish environment',
    'Customized Services - Tailored to enhance your natural beauty'
  ]
}
