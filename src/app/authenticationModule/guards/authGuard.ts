import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { StylistAuthService } from "../../services/stylist-auth-service";

export const CanActivate = () =>{

  const authService = inject(StylistAuthService);

  const router = inject(Router)

  if(authService.isAuthorised()){
    return true // checking if the user is loggedin 
  }else{
    router.navigate(['/login']) // if they are not logged in we want to redirect them to the login page
    return false
  }
}

