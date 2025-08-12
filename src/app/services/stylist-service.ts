import { Injectable } from '@angular/core';

const menStylist: Stylist [] =  [
 {
    id: 2,
    image: 'images/barber-png.webp',
    name: 'Alaska',
    password: 'skjas',
    phoneNum: +233543644,
    email: 'oeywr45',
    bio: 'ths fgdga',
    specialty: 'Men',
    gender: 'Male',
}

  
]
const womenStylist: Stylist [] =  [
  {
    id: 1,
    image: 'images/braids2.webp',
    name: 'Alaska',
    password: 'skjas',
    phoneNum: +233543644,
    email: 'oeywr45',
    bio: 'ths fgdga',
    specialty: 'Women',
    gender: 'Male',
}
 
 
]

@Injectable({
  providedIn: 'root'
})
export class StylistService {

  getMenStylist(){
    return menStylist
  }

  getWomenStylist(){
    return womenStylist
  }

  createStylist(stylist: Stylist): Stylist{
    if(stylist.specialty.toLowerCase() === 'men' && stylist.image === undefined){
      stylist.image = 'images/barber-png.webp';
      menStylist.push(stylist)
      localStorage.setItem('menStylist', JSON.stringify(stylist))
    }else if(stylist.specialty.toLowerCase() === 'women' && stylist.image === undefined){
      stylist.image = 'images/braids2.webp'
      localStorage.setItem('womenStylist', JSON.stringify(stylist))
      womenStylist.push(stylist)
    }

    
    return stylist
  }
}




export interface Stylist{
  id: number
  image?: string
  name: string;
  password: string;
  phoneNum: number;
  email: string;
  gender: string;
  specialty: string; 
  bio: string;
 }

// type Gender = {
//   male: 'Male',
//   female: 'Female'
// }

// type Specialty = {
//   men: 'Men Hair Cut',
//   women: 'Women Hair Styling'
// }