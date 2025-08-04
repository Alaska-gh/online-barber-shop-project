import { Injectable } from "@angular/core"

@Injectable()
export class StylesService{
  // styles data
 Styles: Style[] = [
  {
    image: 'images/braids2.webp',
    title: 'Braids',
    price: 150,
    link: 'Choose Style'
  },
  {
    image: 'images/staff-2.jpeg',
    title: 'Beard triming',
    price: 70,
    link: 'Choose Style'
  },
  {
    image: 'images/staff-3.jpeg',
    title: 'Sweat Cut',
    price: 30,
    link: 'Choose Style'
  },
  {
    image: 'images/staff-4.jpeg',
    title: 'Afro Cut',
    price: 50,
    link: 'Choose Style'
  },
  {
    image: 'images/staff-1.jpeg',
    title: 'layers',
    price: 50,
    link: 'Choose Style'
  }
  
]

}

export interface Style{
  image: string,
  title: string,
  price: number,
  link: string
}