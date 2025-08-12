import { Injectable } from '@angular/core';
import { CardDetails } from '../interface/interface';

const Card: CardDetails[]=[
    {
      image: "../images/staff-3.jpeg",
      name: 'James K. - Regular Client',
      comments: `"Booking through the app was super easy, and my barber, Mike, did an amazing fade! The online payment option saved me time, and the reminder notification was a nice touch. Will definitely book again!"`
    },
    {
      image: "../images/staff-2.jpeg",
      name: 'David R. - Loyal Customer',
      comments: `"Been using this service for months—never disappointed. The barbers are skilled, and the app makes rescheduling a breeze. The loyalty discounts are a huge plus. 10/10 recommend!"`
    },
    {
      image: "../images/staff-1.jpeg",
      name: 'Sarah T. -  First-Time Client',
      comments: `"Loved the convenience of choosing a barber based on reviews. The haircut was great, but the wait time was a bit longer than expected. Still, the service was professional, and I’ll be back!"`
    },
  ]

@Injectable({
  providedIn: 'root'
})
export class ClientFeedbackService {
  
  getCardDetails(){
    return Card;
  }
}

