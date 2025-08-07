import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  list: Footer = {
     link: [''],
     busHours: [''],
     company: [''],
     contact: ['']
  }
  
}
interface Footer{
  link: string[],
  busHours: string[],
  company: string[],
  contact: string[]
}