import {  Component, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  StylistService } from '../../services/stylist-service';
import { Stylist } from '../../interfaces/interface';

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
    shopName: '',
    fullName: '',
    password: '',
    email: '',
    phoneNum:null,
    gender: '',
    serviceType: '',
    
  };
  

 getStylistService = inject(StylistService)


 signUp(){
  
   if(this.selectedSignupType === 'stylist'){
    
   const newStylist: Stylist = {
    id: this.idCounter,
    ...this.model
   }
    this.getStylistService.createStylist(newStylist)
   }
   alert('Acount created successfuly')
  
 }
}
 