import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';
// service
import { PassportService } from '../passport.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [PassportService],
})
export class UserLoginOldComponent implements OnDestroy {
  // 表单对象
  form: FormGroup;
  // 错误信息
  error = '';
  // 加载
  loading = false;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public msgSrv: NzMessageService,
    private change: ChangeDetectorRef,
    public service: PassportService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) {
      return;
    }

    this.loading = true;
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.service
      .Login(this.userName.value, this.password.value)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          // 清空路由复用信息
          this.reuseTabService.clear(true);

          const user = {
            token: res.data.token,
            username: res.data.username,
            nickName: res.data.nickName,
            realName: res.data.realName,
            userFace: res.data.userFace,
            gender: res.data.gender,
            objectId: res.data.objectId,
            time: +new Date(),
          };

          // 设置用户Token信息
          this.tokenService.set(user);

          // 设置用户信息
          this.settingsService.setUser(user);
          // 重新获取 StartupService 内容
          this.startupSrv.load().then(() => {
            this.router.navigate(['/']);
            // 由于angular-cli升级到8.x的关系，偶尔会提示"ViewDestroyedError: Attempt to use a destroyed view: detectChanges"错误，但不影响功能使用
            this.change.detach();
          });
        } else {
          this.error = '用户名或密码错误';
        }
      })
      .catch(() => {
        this.loading = false;
        this.error = '用户名或密码错误';
      });
  }

  ngOnDestroy(): void {}
}
