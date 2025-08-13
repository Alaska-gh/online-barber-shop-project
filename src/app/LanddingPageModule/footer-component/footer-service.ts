import { Injectable } from '@angular/core';
import { Footer } from '../../interfaces/interface';

  const list: Footer []= [
    {
      group: {
        title: 'Link',
        items: [
          'Services',
          'Book Apointment',
          'About Us',
          'Privacy Policy',
          'Contact'
        ]
      }
    },
    {
      group: {
        title: 'Business Hours',
        items: [
          'Monday - Friday 8am - 5pm',
          'Weekends 12pm - 5pm',
      
        ]
      }
    },
    {
      group: {
        title: 'Company',
        items: [
          'No 33, Medical Village',
          'Koforidua',
          'Eastern Region',
          'Ghana'
      
        ]
      }
    },
    {
      group: {
        title: 'Contact',
        items: [
          'Youtube',
          'Twiter (X)',
          'Instagram',
          'Facebook'
        ]
      }
    },
  ]

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  getList(){
    return list
  }  
}
