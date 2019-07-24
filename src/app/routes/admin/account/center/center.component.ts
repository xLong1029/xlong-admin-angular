import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

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
    face: null,
    username: null,
    nickName: null,
    realName: null,
    gender: null,
  };

  constructor(
    private messageSrv: NzMessageService,
    public service: AccountService,
    public settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit() {
    console.log(this.settings.user.name);

    // this.tokenService.change().subscribe(res => {
    //   console.log(res);
    // });
  }

  // 提交表单
  submit() {
    // this.service
    //   .AddAccount(this.editForm)
    //   .then((res: any) => {
    //     if (res.code === 200) {
    //       this.messageSrv.success(res.msg);
    //       this.close(true);
    //     } else {
    //       this.messageSrv.error(res.msg);
    //     }
    //   })
    //   .catch((err: any) => console.log(err));
  }
}
