import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarredBarbersService {
   cardItems: Card[]= 
 [
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    disc: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    disc: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    disc: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    disc: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    disc: 'Senior Barber'
  
  }
]
}

interface Card {
  image: string,
  name: string,
  disc: string
}