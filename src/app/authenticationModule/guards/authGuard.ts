import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StylistAuthService } from '../../services/stylist-auth-service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(StylistAuthService);
  const router = inject(Router);

  const state = authService.logInState.value
  
  if(state){
    return true 
  }

  router.navigate(['login'])
  return false
};
