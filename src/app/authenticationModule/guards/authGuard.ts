import { IDeactivateComponent } from './../../interfaces/canDeactivate.interface';
import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth-service';
import { DynamicComponent } from '../../services/dynamicComponent.service';
import { StylistService } from '../../services/stylist.service';

//Prevents navigation to a route unless the user is logged in
export const authGuard: CanActivateFn = () => {
  const authService = inject(UserAuthService);
  return authService.logInState.value;
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
