import {  Component, inject  } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  StylistAuthService } from '../../services/stylist-auth-service';
import { Stylist } from '../../interfaces/interface';
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
 getStylistService = inject(StylistAuthService)

 signUpForm = this.formBuilder.group({
  signupType:['customer'],
  shopName: ['', [Validators.required]],
  fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  gender:['', Validators.required],
  serviceType:['', Validators.required]
 },
 {
   validators: passwordMatchValidator
  }
)

 selectedSignupType: string;

 ngOnInit(){
  this.signUpForm.get('signupType')?.valueChanges.subscribe((value)=>{
    this.selectedSignupType = value
 });
 
 }

//  this counter will be inremented upon creating a new user
 private idCounter: number = 0;

 signUp(){
  
  const formValues = this.signUpForm.value
   if(this.selectedSignupType === 'stylist'){
   const stylistData: Stylist = {
    id: this.idCounter,
    shopName: formValues.shopName,
    fullName: formValues.fullName,
    email: formValues.email,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
    gender: formValues.gender,
    serviceType: formValues.serviceType
   }
   delete stylistData.confirmPassword;

    this.getStylistService.createStylist(stylistData).subscribe(
      response => {
        alert('Acount created successfuly');
         this.router.navigate(['login'])
      },
      error =>{
        console.log(error);
        
      }
    )
   }
   
  
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
