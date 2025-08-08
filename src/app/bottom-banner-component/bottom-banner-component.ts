import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bottom-banner',
  imports: [CommonModule],
  templateUrl: './bottom-banner-component.html',
  styleUrl: './bottom-banner-component.css'
})
export class BottomBannerComponent {
  // saving a list of image urls in an array to use in the template
  imageUrls = ['../images/last-1.jpeg','../images/last-2.jpeg','../images/picture-1.jpeg']
}
