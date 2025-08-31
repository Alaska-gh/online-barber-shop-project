import { Injectable } from '@angular/core';
import { Services } from '../interfaces/services.interface';
import { Subject } from 'rxjs';

  const services: Services[] = [
      {  
        id: 1,
        name: "Afro mullet High Fade",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "AFRO",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 50,
        image: "images/men-haircuts/afro-mullet-high-fade-haircut.jpg",   
        duration: 45 
      },
      {  
        id: 2,
        name: "Braid Haircut",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 50,
        image: "images/men-haircuts/braid-haircut.jpeg",   
        duration: 60 
      },
      {  
        id: 3,
        name: "Fade With Line Up",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "FADE",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 30,
        image: "images/men-haircuts/Fade-with-Line-Up.jpg",   
        duration: 45 
      },
      {  
        id: 4,
        name: "Long Taper Fade",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "FADE",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 30,
        image: "images/men-haircuts/long-taper-fade.jpg",   
        duration: 45 
      },
      {  
        id: 5,
        name: "Low Taper Fade",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "AFRO",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 50,
        image: "images/men-haircuts/low-taper-fade-cropped-afro.webp", 
        duration: 45   
      },
      {  
        id: 6,
        name: "Mid Fade Curly",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "FADE",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 50,
        image: "images/men-haircuts/mid-fade-haircut-curly-hair.jpg",  
        duration: 45  
      },
      {  
        id: 7,
        name: "Mid Zero Fade",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "FADE",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 30,
        image: "images/men-haircuts/mid-zero-fade.jpg",   
        duration: 45 
      },
      {  
        id: 8,
        name: "Side Cut",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "FADE",
        gender: "MEN",
        category: "MEN HAIR STYLE",
        price: 30,
        image: "images/men-haircuts/side-cut.jpg",   
        duration: 45 
      },
      {  
        id: 9,
        name: "Black Cornrows With Crown Bun",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "CORNROW",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/1-black-cornrows-with-crown-bun.webp", 
        duration: 120   
      },
      {  
        id: 10,
        name: "Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 100,
        image: "images/women-hairstyles/2-braids.jpg", 
        duration: 120   
      },
      {  
        id: 11,
        name: "Large Cornrow",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "CORNROW",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 120,
        image: "images/women-hairstyles/2-large-cornrow-braids.jpg",   
        duration: 120 
      },
      
      {  
        id: 12,
        name: "Cornrow",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "CORNROW",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/cornrow.jpg", 
        duration: 120   
      },
      {  
        id: 13,
        name: "Side Swept Knotles Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 120,
        image: "images/women-hairstyles/7-side-swept-knotless-braids.webp",   
        duration: 120 
      },
      {  
        id: 14,
        name: "Flat Loose Twist",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "TWIST",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 120,
        image: "images/women-hairstyles/flat-loose-twist.jpg",
        duration: 120    
      },
      {  
        id: 15,
        name: "Fulani Braids With Curls",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 100,
        image: "images/women-hairstyles/Fulani_Braids_with_curls.jpg", 
        duration: 120   
      },
      {  
        id: 16,
        name: "Fulani Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/fulani-braids.jpg", 
        duration: 120   
      },
      {  
        id: 17,
        name: "Knotless Gypsy Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/knotless-gypsy-braids.jpg", 
        duration: 120   
      },
      {  
        id: 18,
        name: "Locks",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "LOCKS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 250,
        image: "images/women-hairstyles/locks.jpg", 
        duration: 120   
      },
      {  
        id: 19,
        name: "Long Fish Tail",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/long-fish-tail.jpg",  
        duration: 120  
      },
      {  
        id: 20,
        name: "Passion Twist",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "TWIST",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/Passion-Twist.webp", 
        duration: 120   
      },
      {  
        id: 21,
        name: "Short Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 100,
        image: "images/women-hairstyles/short-braids.jpg", 
        duration: 120   
      },
      {  
        id: 22,
        name: "Side",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 100,
        image: "images/women-hairstyles/side.jpeg", 
        duration: 120   
      },
      {  
        id: 23,
        name: "Stitch Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/stitch-braids-hero-scaled.jpg", 
        duration: 120   
      },
      {  
        id: 24,
        name: "Swidish Style",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "BRAIDS",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/swidish-style.jpg",
        duration:120    
      },
      {  
        id: 25,
        name: "Twist Box Braids",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "TWIST",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/twist_box_braids.webp", 
        duration: 120   
      },
      {  
        id: 26,
        name: "Twist",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        brand: "TWIST",
        gender: "WOMEN",
        category: "LADIES HAIR STYLE",
        price: 150,
        image: "images/women-hairstyles/twist.jpeg", 
        duration: 120   
      },
    ]

  @Injectable({
  providedIn: 'root'
})
export class StylesService {

  getServices():Services[]{
    return services
  }
}



