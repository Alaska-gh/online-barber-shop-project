import { Injectable } from '@angular/core';
import { Footer } from '../interfaces/footer.interface';

  const list: Footer[] = [
    {
      group: {
        title: 'Links',
        items: [
          { label: 'Services', value: '' },
          { label: 'Book Apointment', value: '' },
          { label: 'About Us', value: '' },
          { label: 'Privacy Policy', value: '' },
          { label: 'Contact', value: '' },
        ],
      },
    },
    {
      group: {
        title: 'Business Hours',
        items: [
          { label: 'Monday - Friday 8am - 5pm', value: '' },
          { label: 'Weekends 12pm - 5pm', value: '' },
        ],
      },
    },
    {
      group: {
        title: 'Company',
        items: [
          { label: 'No 33, Medical Village', value: '' },
          { label: 'Koforidua', value: '' },
          { label: 'Eastern Region', value: '' },
          { label: 'Ghana', value: '' },
        ],
      },
    },
    {
      group: {
        title: 'Contact',
        items: [
          { label: 'Youtube', value: '' },
          { label: 'Twiter (X)', value: '' },
          { label: 'Instagram', value: '' },
          { label: 'Facebook', value: '' },
        ],
      },
    },
    {
      group: {
        title: 'Language',
        items: [
          { label: 'French', value: 'fr' },
          { label: 'Spanish', value: 'es' },
          { label: 'English', value: 'en' },
          { label: 'Portuguese', value: 'pt' },
        ],
      },
    },
  ];

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  getList(){
    return list
  }  
}
