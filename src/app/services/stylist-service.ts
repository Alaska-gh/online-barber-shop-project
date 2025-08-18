import { Injectable } from '@angular/core';
import { Stylist } from '../interfaces/interface';

const allStylist: Stylist [] = JSON.parse(localStorage.getItem('stylist')) || []

@Injectable({
  providedIn: 'root'
})
export class StylistService {

  getStylist(){
    return allStylist
  }

  createStylist(stylist: Stylist): Stylist{
    if(stylist.serviceType.toLowerCase() === 'barber salon service' && stylist.image === undefined){
      stylist.image = 'images/last-1.jpeg';

    }else if(stylist.serviceType.toLowerCase() === 'beauty salon service' && stylist.image === undefined){
      stylist.image = 'images/staff-1.jpeg';
    }
    else if(stylist.serviceType.toLowerCase() === 'unisex salon service' && stylist.image === undefined){
      stylist.image = 'images/unisex.png'
    }
    allStylist.push(stylist);
    localStorage.setItem('stylist', JSON.stringify(allStylist));
    return stylist
  }
}






