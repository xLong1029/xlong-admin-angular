import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

// service
import { AccountService } from './../account.service';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
})
export class AccountCenterComponent implements OnInit {
  // 加载
  loading = false;
  // 编辑内容
  editForm = {
    username: null,
    userFace: null,
    nickName: null,
    realName: null,
    gender: null,
  };

  constructor(private messageSrv: NzMessageService, public service: AccountService, public settings: SettingsService) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.loading = true;
    this.service
      .GetUserInfo(this.settings.user.objectId)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          this.editForm = res.data;
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 提交表单
  submit() {
    this.service
      .EditProfile(this.editForm, this.settings.user.objectId)
      .then((res: any) => {
        if (res.code === 200) {
          this.messageSrv.success(res.msg);
          // 更新配置内容
          const user = {
            token: this.settings.user.token,
            username: this.editForm.username,
            nickName: this.editForm.nickName,
            realName: this.editForm.realName,
            userFace: this.editForm.userFace,
            gender: this.editForm.gender,
            objectId: this.settings.user.objectId,
            time: +new Date(),
          };
          // 设置用户信息
          this.settings.setUser(user);
        } else {
          this.messageSrv.error(res.msg);
        }
      })
      .catch((err: any) => console.log(err));
  }
}
