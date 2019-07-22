import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';

import { UserDetailComponent } from './user-detail/user-detail.component';

import { UserManageService } from './../user-manage.service';

import { Page } from './../../../../shared/common/page';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  // 加载
  loading = false;
  // 页码
  page = new Page();
  // 筛选
  query: any = {};
  // 表格数据
  data: any = [];
  // 表格列
  columns: STColumn[] = [
    { title: '用户编号', index: 'objectId' },
    { title: '真实姓名', index: 'realname' },
    { title: '性别', index: 'gender' },
    { title: '邮箱', index: 'email' },
    { title: '手机号码', index: 'mobile' },
    { title: '职位', index: 'job' },
    { title: '创建时间', type: 'date', index: 'createdAt' },
    {
      title: '',
      buttons: [
        {
          text: '查看详情',
          click: record => {
            this.detail(record);
          },
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private modal: ModalHelper, public service: UserManageService) {}

  ngOnInit() {
    this.getList();
  }

  // 表格列表
  getList() {
    this.loading = true;
    this.service
      .GetAccList({}, this.page.page, this.page.pageSize)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          this.data = res.data;
          this.page.total = res.page.total;
          console.log(res.page);

          console.log(this.page.total);
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 查看详情
  detail(record) {
    this.modal.createStatic(UserDetailComponent, { record }).subscribe(() => this.st.reload());
  }

  // 新增用户
  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  // 删除用户
  delete() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  // 启用用户
  enable() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  // 禁用用户
  disable() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  // 表格变化回调
  change(e) {}
}
