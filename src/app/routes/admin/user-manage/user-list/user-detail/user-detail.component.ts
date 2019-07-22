import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';

import { UserManageService } from './../../user-manage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  // 传递的记录
  record: any = {};
  // 加载
  loading = false;
  // 详情内容
  detail: any;

  constructor(private modal: NzModalRef, public msgSrv: NzMessageService, public service: UserManageService) {}

  ngOnInit(): void {
    // this.http.get(`/user/${this.record.id}`).subscribe(res => {
    //   this.detail = res;
    // });
    this.getDetail(this.record.objectId);
  }

  // 获取详情
  getDetail(id) {
    this.loading = true;
    this.service
      .GetAccInfo(id)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          this.detail = res.data;
        }
      })
      .catch((err: any) => console.log(err));
  }

  close() {
    this.modal.destroy();
  }
}
