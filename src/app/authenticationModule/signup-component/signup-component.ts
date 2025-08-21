import {  Component, inject  } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/interface';
import { Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match.directive';

@Component({
  selector: 'signup-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent{  
formBuilder: FormBuilder = inject(FormBuilder)

router: Router = inject(Router)
 getStylistService = inject(UserAuthService)


 signUpForm = this.formBuilder.group({
  role:['customer', [Validators.required]],
  fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  gender:['', Validators.required],
  shopName: [''],
  serviceType:['']
 },
 {
   validators: passwordMatchValidator
  }
)


//  this counter will be incremented upon creating a new user
 private idCounter: number = 0;


 signUp(){
  const formValues = this.signUpForm.value
   const stylistData: User = {
    id: this.idCounter++,
    shopName: formValues.shopName,
    fullName: formValues.fullName,
    email: formValues.email,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
    gender: formValues.gender,
    serviceType: formValues.serviceType,
    role: formValues.role
   }

   if(stylistData.role !== 'stylist'){
    delete stylistData.serviceType;
    delete stylistData.shopName
   }

   delete stylistData.confirmPassword;
    
   console.log('Payload being sent:', JSON.stringify(stylistData, null, 2));
   
    this.getStylistService.registerUser(stylistData).subscribe(
      response => {
        alert('Acount created successfuly');
         this.router.navigate(['login'])
      },
      error =>{
        console.log(error);
        
      }
    )
   
 }

//  a getter method to get the formControls

 get sName(){
  return this.signUpForm.controls['shopName']
 }
 get fName(){
  return this.signUpForm.controls['fullName']
 }
 get password(){
  return this.signUpForm.controls['password']
 }

 get email(){
  return this.signUpForm.controls['email']
 }
 get cPassword(){
  return this.signUpForm.controls['confirmPassword']
 }

}
