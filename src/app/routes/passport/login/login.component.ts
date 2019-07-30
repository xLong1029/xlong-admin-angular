import { SettingsService } from '@delon/theme';
import { Component, OnInit, Inject, Optional, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService} from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';
import { NgForm } from '@angular/forms';

// service
import { PassportService } from './../passport.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [PassportService],
})
export class UserLoginComponent implements OnInit {
  @ViewChild('f', { static: false }) f: NgForm;
  // 表单信息
  form = {
    userName: null,
    password: null
  }
  // 错误信息
  error = '';
  // 加载
  loading = false;

  constructor(
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
    modalSrv.closeAll();
  }

  ngOnInit() {
  }

  submit() {
    // 手动更新校验表单-start
    console.log(this.f);
    this.f.form.controls.userName.markAsDirty();
    this.f.form.controls.userName.updateValueAndValidity();
    this.f.form.controls.password.markAsDirty();
    this.f.form.controls.password.updateValueAndValidity();
    if (this.f.form.controls.userName.invalid || this.f.form.controls.password.invalid) {
      return;
    }
    // 手动更新校验表单-end

    this.loading = true;
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.service
      .Login(this.form.userName, this.form.password)
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

  // 清楚错误提示
  clearError(e){
    this.error = '';
  }
}
