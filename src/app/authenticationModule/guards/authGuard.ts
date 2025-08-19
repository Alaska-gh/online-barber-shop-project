import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { StylistAuthService } from "../../services/stylist-auth-service";

export const CanActivate = () =>{

  const authService = inject(StylistAuthService);

  const router = inject(Router)

  if(authService.isAuthorised()){
    return true 
  }else{
    router.navigate(['/login'])
    return false
  }
}

