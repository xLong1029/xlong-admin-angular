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
  // 用户id
  id = 0;
  // 编辑内容
  editForm = {
    userFace: null,
    nickName: null,
    realName: null,
    gender: null,
  };

  constructor(private messageSrv: NzMessageService, public service: AccountService, public settings: SettingsService) {}

  ngOnInit() {
    this.id = this.settings.user.objectId;
    this.editForm = {
      userFace: this.settings.user.userFace,
      nickName: this.settings.user.nickName,
      realName: this.settings.user.realName,
      gender: this.settings.user.gender,
    };
  }

  // 提交表单
  submit() {
    this.service
      .EditProfile(this.editForm, this.id)
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
