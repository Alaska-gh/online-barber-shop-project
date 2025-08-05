import { Component } from '@angular/core';

@Component({
  selector: 'about-component',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  firstParagraph: string = `Welcome to OnlineBarberShop, where style meets sophistication in a welcoming, gender-inclusive space. We believe that everyone deserves to look and feel their best, which is why we've created a modern, unisex salon that caters to all hair types, textures, and personal styles.`

  secondParagraph: string = `Our team of skilled stylists is passionate about delivering exceptional haircuts, coloring, styling, and treatments tailored to your unique preferences. Whether you're looking for a bold transformation, a classic trim, or expert grooming services, we combine the latest techniques with personalized care to ensure you leave feeling confident and refreshed.
  `
  extraPragraph: string = `  At OnlineBarberShop, we prioritize quality, creativity, and a relaxed atmosphere. Using premium products and staying ahead of industry trends, we craft looks that enhance your natural beauty. Your satisfaction is our top priority, and we're committed to making every visit an enjoyable and rejuvenating experience.
  Book an appointment and discover the OnlineBarberShop difference where great hair knows no gender!`
}
