import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthService } from '../../services/user-auth-service';
import { User } from '../../interfaces/user.interface';
import { Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../Validators/password-match.directive';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from '../../services/dynamicComponent.service';

@Component({
  selector: 'signup-component',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  signupType: string;
  //  this counter will be incremented upon creating a new user
  private idCounter: number = 0;
  private showSignupForm: boolean = false;

  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  authservice = inject(UserAuthService);
  dynamicComponent = inject(DynamicComponent);
  toastr = inject(ToastrService);

  signUpForm = this.formBuilder.group(
    {
      role: ['customer', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['male', Validators.required],
      businessName: [''],
      serviceType: [''],
      phone: [],
      region: [''],
      city: [''],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  signUp() {
    this.hideSignupForm();
    const formValues = this.signUpForm.value;
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
    };

    if (userData.role !== 'stylist') {
      delete userData.serviceType;
      delete userData.bussinessName;
      delete userData.city;
      delete userData.phone;
      delete userData.region;
    }

    delete userData.confirmPassword;

    this.authservice.registerUser(userData).subscribe(
      (response) => {
        this.toastr.success('Account Created Successfully', 'Welcome');
        this.dynamicComponent.loginBtnClicked(true);
      },
      (error) => {
        this.toastr.error(`Couldn't create account ${error}`);
      }
    );
    this.resetForm();
  }

  hideSignupForm() {
    this.dynamicComponent.signupBtnClicked(this.showSignupForm);
  }
  onRoleChanged() {
    this.signupType = this.signUpForm.controls['role'].value;
    this.resetForm();
  }

  //  a getter method to get the formControls
  get bussinessName() {
    return this.signUpForm.controls['bussinesName'];
  }
  get firstName() {
    return this.signUpForm.controls['firstName'];
  }
  get lastName() {
    return this.signUpForm.controls['lastName'];
  }
  get password() {
    return this.signUpForm.controls['password'];
  }

  get email() {
    return this.signUpForm.controls['email'];
  }
  get cPassword() {
    return this.signUpForm.controls['confirmPassword'];
  }

  resetForm() {
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      role: this.signupType,
      gender: 'male',
      serviceType: '',
    });
  }
}
