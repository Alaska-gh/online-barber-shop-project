import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth-service';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { SignupLoader } from '../../utilities/login/signup-loader/signup-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SignupLoader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  authService: UserAuthService = inject(UserAuthService);
  dynamicComponent = inject(DynamicComponent);
  activeRoute = inject(ActivatedRoute);
  showLoginForm: boolean = false;
  isLoading: boolean;

  constructor(private toastr: ToastrService) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get pwd() {
    return this.loginForm.controls['password'];
  }

  async onLoginClicked() {
    this.isLoading = true;
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;
    try {
      const user = await this.authService.loginUser(email, password);
      this.toastr.success('Logged In Successfully', 'Welcome !!!');
      this.redirectUser(user.role);
      this.hideLoginForm();
    } catch (err) {
      this.toastr.error(err.message);
    } finally {
      this.isLoading = false;
    }

    this.loginForm.reset();
  }

  redirectUser(role: string) {
    if (role === 'stylist') {
      this.router.navigate(['dashboard/summary']);
    } else if (role === 'customer') {
      this.router.navigate(['home']);
    } else {
      // fallback
      this.router.navigate(['/login']);
    }
  }

  hideLoginForm() {
    this.dynamicComponent.loginBtnClicked(this.showLoginForm);
  }

  showSignupForm(value: boolean) {
    this.dynamicComponent.signupBtnClicked(value);
  }
}
