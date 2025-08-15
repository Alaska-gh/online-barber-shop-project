import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Stylist } from '../../interfaces/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  @ViewChild('user') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('errMsg') errMessage: ElementRef

  router: Router = inject(Router);
  stylist: Stylist
  authService: AuthService = inject(AuthService)

  activeRoute = inject(ActivatedRoute)

 ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((route)=>{
    const logout = Boolean(route.get('logout'));

    if(logout && this.authService.isLoggedIn){
      this.authService.logout();
      alert(`you are logged out: status: ${this.authService.isLoggedIn}`)
    }
   })
 }

  onLoginClicked(){
    const username: string = this.username.nativeElement.value;
    const password : string = this.password.nativeElement.value;

    this.stylist = this.authService.login(username, password);

    if(this.stylist){
      this.errMessage.nativeElement.innerHTML = `Welcome ${this.stylist.fullName} you are logged in`
      setTimeout(()=>{
        this.router.navigate(['home'])
      },300)
    }
    else{
        this.errMessage.nativeElement.innerHTML = `Sorry your credentials are incorrect`;
    }
    
  }
}
