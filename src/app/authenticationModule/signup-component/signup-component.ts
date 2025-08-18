import {  Component, inject  } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  StylistService } from '../../services/stylist-service';
import { Stylist } from '../../interfaces/interface';
import { RouterModule } from '@angular/router';

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


 getStylistService = inject(StylistService)

 signUpForm = this.formBuilder.group({
  signupType:['customer'],
  shopName: ['', [Validators.required]],
  fName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required]],
  username: ['', [Validators.required]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  gender:['', Validators.required],
  serviceType:['', Validators.required]
 })

 selectedSignupType: string;

 ngOnInit(){
  this.signUpForm.get('signupType')?.valueChanges.subscribe((value)=>{
    this.selectedSignupType = value
 });
 
 }

  private idCounter: number = 0;

  // model = {
  //   shopName: this.signUpForm.get('shopName')?.value,
  //   fullName: this.signUpForm.get('fName')?.value,
  //   password: this.signUpForm.get('password')?.value,
  //   confirmPassword: this.signUpForm.get('confirmPassword')?.value,
  //   email: this.signUpForm.get('email')?.value,
  //   phoneNum: Number(this.signUpForm.get('phone')?.value),
  //   gender: this.signUpForm.get('gender')?.value,
  //   serviceType: this.signUpForm.get('serviceType')?.value,
  //   userName: this.signUpForm.get('username')?.value,
  // };
  

  
 signUp(){

  const formValues = this.signUpForm.value
   if(this.selectedSignupType === 'stylist'){
   const newStylist: Stylist = {
    id: this.idCounter,
    shopName: formValues.shopName,
    fullName: formValues.fName,
    email: formValues.email,
    phoneNum: +formValues.phone,
    userName: formValues.username,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
    gender: formValues.gender,
    serviceType: formValues.serviceType
   }
    this.getStylistService.createStylist(newStylist)
   }
   alert('Acount created successfuly');
 }

 get sName(){
  return this.signUpForm.controls['shopName']
 }
 get fName(){
  return this.signUpForm.controls['fName']
 }
 get password(){
  return this.signUpForm.controls['password']
 }
 get phoneNum(){
  return this.signUpForm.controls['phone']
 }
 get email(){
  return this.signUpForm.controls['email']
 }
 get cPassword(){
  return this.signUpForm.controls['confirmPassword']
 }
 get userName(){
  return this.signUpForm.controls['username']
 }
}
