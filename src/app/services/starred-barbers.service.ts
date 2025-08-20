import { Injectable } from '@angular/core';
import { CardDetails } from '../interfaces/interface';

// hard coded values for the barbers information
 const cardItems: CardDetails[]= 
 [
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    comments: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    comments: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    comments: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    comments: 'Senior Barber'
  
  },
   {
    image: '../images/staff-1.jpeg',
    name: 'Yussif Bashiru',
    comments: 'Senior Barber'
  
  }
]
@Injectable({
  providedIn: 'root'
})
export class StarredBarbersService {
//  returning list of data 
  getCardItem(){
    return cardItems;
  }
}

