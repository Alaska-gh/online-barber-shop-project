import { Injectable } from '@angular/core';
import { Styles } from '../interfaces/interface';

  const style: Styles [] = [
    {
      image: 'images/men-haircuts/mid-fade-haircut-curly-hair.jpg',
      title: 'Mid Fade',
      price: 150,
    },
    {
      image: 'images/men-haircuts/Fade-with-Line-Up.jpg',
      title: 'Fade with line',
      price: 70,
    },
    {
      image: 'images/men-haircuts/long-taper-fade.jpg',
      title: 'Long Taper Fade',
      price: 30,
    },
    {
      image: 'images/men-haircuts/afro-mullet-high-fade-haircut.jpg',
      title: 'Afro Cut',
      price: 50,
    },
    {
      image: 'images/women-hairstyles/2-braids.jpg',
      title: 'Braids',
      price: 150,
    },
    {
      image: 'images/women-hairstyles/cornrow.jpg',
      title: 'Cornrow',
      price: 150,
    },
    {
      image: 'images/women-hairstyles/flat-loose-twist.jpg',
      title: 'Twist',
      price: 70,
    },
    {
      image: 'images/women-hairstyles/fulani-braids.jpg',
      title: 'Fulani Braids',
      price: 30,
    },
    {
      image: 'images/women-hairstyles/knotless-gypsy-braids.jpg',
      title: 'KSnotless Braids',
      price: 50,
    },
    {
      image: 'images/women-hairstyles/swidish-style.jpg',
      title: 'Swidish Style',
      price: 150,
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



