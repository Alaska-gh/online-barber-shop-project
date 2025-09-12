import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if `password` and `confirmPassword` fields match.
export const passwordMatchValidator: ValidatorFn = (
  controls: AbstractControl
): ValidationErrors | null => {
  // Get the password and confirmPassword controls from the form group
  const password = controls.get('password');
  const confirmPassword = controls.get('confirmPassword');

  // If either field is missing, skip validation
  if (!password || !confirmPassword) {
    return null;
  }

  // Return null if passwords match, otherwise return an error object
  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true }; // <-- corrected typo from 'passwardMismatch'
};
