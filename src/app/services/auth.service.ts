import { inject, Injectable, OnInit } from "@angular/core";
import { StylistService } from "./stylist-service";
import { Stylist } from "../interfaces/interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  isLoggedIn: boolean = false;

  stylistArray: Stylist[]= []

  matchingStylist: Stylist;

  stylistService: StylistService = inject(StylistService);

  logInState = new Subject<boolean>()


  login( userName: string, password: string){
   this.stylistArray = this.stylistService.getStylist()
    
     this.matchingStylist = this.stylistArray.find((stylist) => 
      stylist.userName === userName && stylist.password === password
  );

    if(this.matchingStylist)
      this.isLoggedIn = true;
    else
      this.isLoggedIn =false;

    this.logInState.next(this.isLoggedIn)
    return this.matchingStylist
  }

  logout(){
    this.isLoggedIn = false
    this.logInState.next(this.isLoggedIn)
  }

  isAuthorised(){
   return this.isLoggedIn
  }
}