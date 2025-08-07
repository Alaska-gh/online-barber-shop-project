import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientFeedbackService {
  Card: CardDetails[]=[
    {
      image: "../images/staff-1.jpeg",
      name: 'Alaska',
      text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem 
              placeat quod accusantium optio debitis commodi!`
    },
    {
      image: "../images/staff-1.jpeg",
      name: 'Alaska',
      text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem 
              placeat quod accusantium optio debitis commodi!`
    },
    {
      image: "../images/staff-1.jpeg",
      name: 'Alaska',
      text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem 
              placeat quod accusantium optio debitis commodi!`
    },
  ]
}

interface CardDetails{
  image: string,
  name: string,
  text: string
}