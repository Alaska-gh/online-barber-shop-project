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
import { passwordMatchValidator } from '../../validators/password-match.directive';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { SignupLoader } from '../../utilities/login/signup-loader/signup-loader';

@Component({
  selector: 'signup-component',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, SignupLoader],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  signupType: string;
  //  this counter will be incremented upon creating a new user
  private idCounter: number = 0;
  private showSignupForm: boolean = false;
  isLoading: boolean;

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
    this.isLoading = true;
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

    this.authservice.registerUser(userData).subscribe({
      next: () => {
        this.toastr.success('Account Created Successfully', 'Welcome');
        this.hideSignupForm();
        this.dynamicComponent.loginBtnClicked(true);
        this.isLoading = false;
      },
      error: (error) => {
        setTimeout(() => {
          this.isLoading = false;
          this.toastr.error(`Couldn't create account ${error}`);
        }, 3000);
      },
    });
    this.resetForm();
  }

  hideSignupForm() {
    this.dynamicComponent.signupBtnClicked(this.showSignupForm);
  }

  showLogingForm(value: boolean) {
    this.dynamicComponent.loginBtnClicked(value);
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
