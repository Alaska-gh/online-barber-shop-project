import { IDeactivateComponent } from './../../interfaces/canDeactivate.interface';
import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth-service';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { StylistService } from '../../services/stylist.service';
import { User } from '../../interfaces/user.interface';

//Prevents navigation to a route unless the user is logged in
export const authGuard: CanActivateFn = () => {
  const authService = inject(UserAuthService);
  const dynamicComponent = inject(DynamicComponent);

  const state = authService.logInState.value; // Current login state (true if logged in)

  if (state) {
    return true; // Allow route activation
  }

  // If not logged in, open login modal and block navigation
  dynamicComponent.loginBtnClicked(true);
  return false;
};

//  Prevents the user from accidentally leaving a route with unsaved changes.
export const deactivateGuard: CanDeactivateFn<IDeactivateComponent> = (
  component: IDeactivateComponent
) => {
  return component.canExit(); // Must return true/false or an observable/promise
};

// Pre-fetches all stylist data before navigating to the route.
export const resolveGuard = () => {
  const stylistService = inject(StylistService);
  return stylistService.fetchAllStylist(); // Returns an observable of stylist data
};
