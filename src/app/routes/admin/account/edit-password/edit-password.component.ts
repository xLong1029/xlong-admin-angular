import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

// service
import { AccountService } from './../account.service';

@Component({
  selector: 'app-account-edit-password',
  templateUrl: './edit-password.component.html',
})
export class AccountEditPasswordComponent implements OnInit {
  // 用户id
  id = 0;
  // 编辑内容
  editForm = {
    oldPassword: null,
    newPassword: null,
    comfirPassword: null,
  };

  constructor(private messageSrv: NzMessageService, public service: AccountService, public settings: SettingsService) {}

  ngOnInit() {}

  // 提交表单
  submit() {
    this.service
      .ChangePwd(this.editForm, this.id)
      .then((res: any) => {
        if (res.code === 200) {
          this.messageSrv.success(res.msg);
        } else {
          this.messageSrv.error(res.msg);
        }
      })
      .catch((err: any) => console.log(err));
  }
}
