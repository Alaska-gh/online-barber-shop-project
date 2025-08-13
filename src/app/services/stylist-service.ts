import { Injectable } from '@angular/core';
import { Stylist } from '../interfaces/interface';

const allStylist: Stylist [] =  [
  {
    id: 1,
    shopName: 'Jackie Joe Barber Shop',
    image: 'images/female-avatar.jpeg',
    fullName: 'Jaclie Joe',
    password: 'Jackiee',
    phoneNum: +233543644,
    email: 'jackie@gmail.com',
    gender: 'Male',
    serviceType: 'Beauty Salon Service'
},
 {
    id: 2,
    image: 'images/male-avatar.jpeg',
    shopName: 'Elite Beauty Bar',
    fullName: 'Bless Tulasi',
    password: 'blesred',
    phoneNum: +233543644,
    email: 'bless@gmail.com',
    gender: 'Male',
    serviceType: 'Barber Salon Service'
},
 {
    id: 3,
    image: 'images/unisex.png',
    shopName: 'Elite Beauty Bar',
    fullName: 'Bless Tulasi',
    password: 'blesred',
    phoneNum: +233543644,
    email: 'bless@gmail.com',
    gender: 'Male',
    serviceType: 'Unisex Salon Service'
}
 
 
]

@Injectable({
  providedIn: 'root'
})
export class StylistService {

  getStylist(){
    return allStylist
  }

  createStylist(stylist: Stylist): Stylist{
    if(stylist.serviceType.toLowerCase() === 'barber salon service' && stylist.image === undefined){
      stylist.image = 'images/male-avatar.jpeg';

    }else if(stylist.serviceType.toLowerCase() === 'beauty salon service' && stylist.image === undefined){
      stylist.image = 'images/female-avatar.jpeg';
    }
    else if(stylist.serviceType.toLowerCase() === 'unisex salon service' && stylist.image === undefined){
      stylist.image = 'images/unisex.png'
    }
    allStylist.push(stylist)
    return stylist
  }
}






