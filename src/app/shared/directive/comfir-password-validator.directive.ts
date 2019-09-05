import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appConfirmPwdValidate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPwdValidatorDirective,
      multi: true,
    },
  ],
})
export class ConfirmPwdValidatorDirective implements Validator {
  @Input('appConfirmPwdValidate') password: string;
  constructor() {}
  validate(control: AbstractControl): { [key: string]: any } {
    return this.password ? comfirmPswValidator(this.password)(control) : null;
  }
}

export function comfirmPswValidator(_password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return { required: true };
    }
    return control.value !== _password ? { difference: '两次密码不一致' } : null;
  };
}
