import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const passwordMatchValidator:ValidatorFn = (controls: AbstractControl): ValidationErrors | null=>{
  const password = controls.get('password');
  const confirmPassword = controls.get('confirmPassword');

  if(!password || !confirmPassword){
    return null
  }

  return password.value === confirmPassword.value ? null : {passwardMismatch: true}
}