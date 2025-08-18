import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Stylist } from '../../interfaces/interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  @ViewChild('errMsg') errMessage: ElementRef

 formBuilder: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);
  stylist: Stylist
  authService: AuthService = inject(AuthService)

  activeRoute = inject(ActivatedRoute)

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password:['', [Validators.required, Validators.minLength(8)
    ]]
  })


 ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((route)=>{
    const logout = Boolean(route.get('logout'));

    if(logout && this.authService.isLoggedIn){
      this.authService.logout();
      alert(`you are logged out: status: ${this.authService.isLoggedIn}`)
    }
   })
 }

 get userName(){
  return this.loginForm.controls['username']
 }

 get pwd(){
  return this.loginForm.controls['password']
 }

  onLoginClicked(){
    const username: string = this.loginForm.get('username')?.value;
    const password : string = this.loginForm.get('password')?.value;

    this.stylist = this.authService.login(username, password);
    console.log(this.stylist.password);
    

    if(this.stylist){
      alert(`Welcome ${this.stylist.fullName} you are logged in`)
        this.router.navigate(['home'])
    }
    else{
        this.errMessage.nativeElement.innerHTML = `Sorry your credentials are incorrect`;
    }
    
  }
}
