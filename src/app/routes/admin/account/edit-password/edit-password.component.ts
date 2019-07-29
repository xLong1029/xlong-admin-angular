import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

// service
import { AccountService } from './../account.service';

@Component({
  selector: 'app-account-edit-password',
  templateUrl: './edit-password.component.html',
})
export class AccountEditPasswordComponent implements OnInit {
  // 编辑内容
  editForm = {
    oldPassword: null,
    newPassword: null,
    comfirPassword: null,
  };

  constructor(
    private router: Router,
    private messageSrv: NzMessageService,
    public service: AccountService,
    public settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit() {}

  // 提交表单
  submit() {
    this.service
      .ChangePwd(this.editForm, this.settings.user.objectId)
      .then((res: any) => {
        if (res.code === 200) {
          this.messageSrv.success('密码修改成功！请重新登录');
          // 清空信息
          this.tokenService.clear();
          this.settings.setUser(null);
          // 跳转登录页
          this.router.navigateByUrl(this.tokenService.login_url!);
        } else {
          this.messageSrv.error(res.msg);
        }
      })
      .catch((err: any) => console.log(err));
  }
}
