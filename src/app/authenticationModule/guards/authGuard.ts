import { IDeactivateComponent } from './../../interfaces/canDeactivate.interface';
import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth-service';
import { DynamicComponent } from '../../services/dynamicComponent.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(UserAuthService);
  const dynamicComponent = inject(DynamicComponent);

  const state = authService.logInState.value;

  if (state) {
    return true;
  }
  dynamicComponent.loginBtnClicked(true);
  return false;
};

export const deactivateGuard: CanDeactivateFn<IDeactivateComponent> = (
  component: IDeactivateComponent
) => {
  return component.canExit();
};
