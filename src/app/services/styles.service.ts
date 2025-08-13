import { Injectable } from '@angular/core';
import { Styles } from '../interfaces/interface';

  const style: Styles [] = [
    {
      image: 'images/braids2.webp',
      title: 'Braids',
      price: 150,
      link: 'Book Now'
    },
    {
      image: 'images/staff-2.jpeg',
      title: 'Beard',
      price: 70,
      link: 'Book Now'
    },
    {
      image: 'images/staff-3.jpeg',
      title: 'Sweat Cut',
      price: 30,
      link: 'Book Now'
    },
    {
      image: 'images/staff-4.jpeg',
      title: 'Afro Cut',
      price: 50,
      link: 'Book Now'
    },
    {
      image: 'images/staff-1.jpeg',
      title: 'Layers',
      price: 150,
      link: 'Book Now'
    },
    {
      image: 'images/braids2.webp',
      title: 'Braids',
      price: 150,
      link: 'Book Now'
    },
    {
      image: 'images/staff-2.jpeg',
      title: 'Beard',
      price: 70,
      link: 'Book Now'
    },
    {
      image: 'images/staff-3.jpeg',
      title: 'Sweat Cut',
      price: 30,
      link: 'Book Now'
    },
    {
      image: 'images/staff-4.jpeg',
      title: 'Afro Cut',
      price: 50,
      link: 'Book Now'
    },
    {
      image: 'images/staff-1.jpeg',
      title: 'Layers',
      price: 150,
      link: 'Book Now'
    },
    
    
    
  ]

  @Injectable({
  providedIn: 'root'
})
export class StylesService {
  getStyles(): Styles[]{
    return style
  }
}



