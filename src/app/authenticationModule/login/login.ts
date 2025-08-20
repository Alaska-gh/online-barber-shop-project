import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StylistAuthService } from '../../services/stylist-auth-service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  formBuilder: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);

  authService: StylistAuthService = inject(StylistAuthService)

  activeRoute = inject(ActivatedRoute)

  loginForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password:['', [Validators.required, Validators.minLength(8)
    ]]
  })

 ngOnInit(): void {
   
 }

 get email(){
  return this.loginForm.controls['email']
 }

 get pwd(){
  return this.loginForm.controls['password']
 }

  onLoginClicked(){
  const email: string = this.loginForm.get('email')?.value;
  const password : string = this.loginForm.get('password')?.value;

  this.authService.login(email, password).subscribe({
  next: (stylist) => {
    if (stylist) {
        this.router.navigate(['dashboard']);
    } else {
      console.log('Login failed');
    }
  },
  error: (err) => {
    console.error('Login error:', err);
  }
});
    
  }
}
