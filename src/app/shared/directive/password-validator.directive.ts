import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
// 用 Validator 接口来约束 自定义的指令，这是Angular提供的验证器的类
export class PasswordValidatorDirective implements Validator {
  // 密码正则表达式
  regPassword = /^[\w]{6,12}$/;

  constructor() {}
  // validate属性，会传入表单的formControl，返回 ValidationErrors 对象
  validate(control: AbstractControl): { [key: string]: any } {
    // 获取应用该指令，控件上的值
    if (control.value) {
      if (!this.regPassword.test(control.value)) {
        return { appPasswordValidate: '密码格式为6-12位，字母、数字和下划线的组合' };
      } else return null;
    } else return null;
  }
}
