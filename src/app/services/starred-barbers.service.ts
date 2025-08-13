import { Card } from '../interfaces/interface';
import { Injectable } from '@angular/core';


 const cardItems: Card[]= 
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
@Injectable({
  providedIn: 'root'
})
export class StarredBarbersService {

  getCardItem(){
    return cardItems;
  }
}

