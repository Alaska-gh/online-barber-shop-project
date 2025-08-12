import { Injectable } from '@angular/core';
import { Card } from '../interface/interface';


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

