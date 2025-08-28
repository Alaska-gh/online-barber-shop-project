import {  Component, inject  } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
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
signupType: string;
//  this counter will be incremented upon creating a new user
 private idCounter: number = 0;

formBuilder: FormBuilder = inject(FormBuilder)
router: Router = inject(Router)
getStylistService = inject(UserAuthService)

 signUpForm = this.formBuilder.group({
  role:['customer', [Validators.required]],
  firstName: ['', Validators.required],
  lastName: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  gender:['male', Validators.required],
  businessName: [''],
  serviceType:[''],
  phone:[''],
  region:[''],
  city:['']
 },
 {
   validators: passwordMatchValidator
  }
)


 signUp(){
  const formValues = this.signUpForm.value
   const userData: User = {
    id: this.idCounter++,
    bussinessName: formValues.businessName,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
    gender: formValues.gender,
    serviceType: formValues.serviceType,
    role: formValues.role,
    phone: formValues.phone,
    region: formValues.region,
    city: formValues.city,
   }

   if(userData.role !== 'stylist'){
    delete userData.serviceType;
    delete userData.bussinessName;
    delete userData.city;
    delete userData.phone;
    delete userData.region
   }

   delete userData.confirmPassword;
    
   console.log('Payload being sent:', JSON.stringify(userData, null, 2));
   
    this.getStylistService.registerUser(userData).subscribe(
      response => {
        alert('Acount created successfuly');
         this.router.navigate(['login'])
      },
      error =>{
        console.log(error);
        
      }
    )
   this.resetForm()
 }


 onRoleChanged(){
  this.signupType = this.signUpForm.controls['role'].value;
  this.resetForm()
 }


//  a getter method to get the formControls
 get bussinessName(){
  return this.signUpForm.controls['bussinesName']
 }
 get firstName(){
  return this.signUpForm.controls['firstName']
 }
 get lastName(){
  return this.signUpForm.controls['lastName']
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

 resetForm(){
    this.signUpForm.reset()
    this.signUpForm.patchValue({
      role: this.signUpForm.value.role,
      gender: this.signUpForm.value.gender,
      serviceType: this.signUpForm.value.serviceType,
    })
    
 }

 
}
