import { Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
// tslint:disable-next-line: no-duplicate-imports
import { Router } from '@angular/router';

export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    public msgSrv: NzMessageService,
    public settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  canActivate() {
    const token = this.tokenService.get().token && this.settings.user.token;
    if (token) return true;
    else {
      this.msgSrv.error('登录认证信息失效！请重新登录');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
