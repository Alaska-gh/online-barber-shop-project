import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stylist, StylistService } from '../../services/stylist-service';

@Component({
  selector: 'signup-component',
  imports: [FormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent{

  selectedSignupType: string = 'customer';
  

  private idCounter: number = 0;

   model = {
    name: '',
    password: '',
    email: '',
    phoneNum: 0,
    gender: '',
    specialty: '',
    bio: ''
  };
  

 getStylistService = inject(StylistService)


 signUp(){
  
   if(this.selectedSignupType === 'stylist'){
     const newStylist: Stylist ={
    id: this.idCounter++,
    ...this.model
   }
    this.getStylistService.createStylist(newStylist)
    
   }
   alert('Acount created successfuly')
  
 }
}
 