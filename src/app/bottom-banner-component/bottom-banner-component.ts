import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bottom-banner',
  imports: [CommonModule],
  templateUrl: './bottom-banner-component.html',
  styleUrl: './bottom-banner-component.css'
})
export class BottomBannerComponent {
  imageUrls = ['../images/last-1.jpeg','../images/last-2.jpeg','../images/picture-1.jpeg']
}
