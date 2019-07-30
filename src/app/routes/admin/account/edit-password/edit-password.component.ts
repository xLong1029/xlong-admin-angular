import { Component, AfterViewInit, Inject, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NgForm } from '@angular/forms';

// service
import { AccountService } from './../account.service';

@Component({
  selector: 'app-account-edit-password',
  templateUrl: './edit-password.component.html',
})
export class AccountEditPasswordComponent implements AfterViewInit {
  @ViewChild('f', { static: false }) f: NgForm;

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

  ngAfterViewInit() {
    // 解决IE11下，表单自动校验导致错误提示显示的问题
    setTimeout(() => {
        for (const key in this.f.form.controls) {
            if (this.f.form.controls[key]) {
                this.f.form.controls[key].markAsPristine();
                this.f.form.controls[key].updateValueAndValidity();
            }
        }
    });
  }

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
