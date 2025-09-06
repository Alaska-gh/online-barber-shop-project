import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth-service';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from '../../services/dynamicComponent.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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

  constructor(private toastr: ToastrService) {}
  loginForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get pwd() {
    return this.loginForm.controls['password'];
  }

  onLoginClicked() {
    this.hideLoginForm();
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;

    this.authService.loginUser(email, password).subscribe({
      next: (user) => {
        if (user) {
          this.toastr.success('Logged In Successfully', 'Welcome !!!');
          this.redirectUser(user.role);
        } else {
          this.toastr.error('Invalid Credentials', 'Login Failed !!!');
        }
      },
      error: (err) => {
        this.toastr.error(`Couldn't Login at this time ${err}`);
      },
    });
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
}
