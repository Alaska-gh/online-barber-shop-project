import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

export const CanActivate = () =>{

  const authService = inject(AuthService);

  const router = inject(Router)

  if(authService.isAuthorised()){
    return true 
  }else{
    router.navigate(['/login'])
    return false
  }
}

