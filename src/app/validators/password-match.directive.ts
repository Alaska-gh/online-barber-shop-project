import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  controls: AbstractControl
): ValidationErrors | null => {
  const password = controls.get('password');
  const confirmPassword = controls.get('confirmPassword');

  // If either field is missing, skip validation
  if (!password || !confirmPassword) {
    return null;
  }

  // Return null if passwords match, otherwise return an error object
  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
};
