import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth-service';
import { IDeactivateComponent } from '../../interfaces/interface';

export const authGuard: CanActivateFn = () => {
  const authService = inject(UserAuthService);
  const router = inject(Router);

  const state = authService.logInState.value
  
  if(state){
    return true 
  }
  router.navigate(['login'])
  return false
};



export const deactivateGuard: CanDeactivateFn<IDeactivateComponent> 
                                      = (component: IDeactivateComponent) =>{

 return component.canExit()
}
