import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STColumnTag } from '@delon/abc';

// component
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserStoreComponent } from './user-store/user-store.component';
// service
import { AdminPublicService } from './../../../public/public.service';
import { UserManageService } from './../user-manage.service';
// ts
import { Page } from '@common/page';
import { EnabledStateTag } from '@common/enableStateTag';

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
  // 表格列
  columns: STColumn[] = [
    { title: '用户编号', index: 'objectId' },
    { title: '真实姓名', index: 'realname' },
    { title: '性别', index: 'gender' },
    { title: '邮箱', index: 'email' },
    { title: '手机号码', index: 'mobile' },
    { title: '职位', index: 'job' },
    { title: '所在省市', index: 'province' },
    { title: '状态', index: 'enabledState', type: 'tag', tag: EnabledStateTag },
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
        {
          text: '编辑',
          click: record => {
            this.store(record);
          },
        },
      ],
    },
  ];

  // 省市列表
  cityList = [];
  // 职位列表
  jobList = [];

  constructor(
    private modal: ModalHelper,
    public publicService: AdminPublicService,
    public service: UserManageService,
  ) {}

  ngOnInit() {
    this.getTableList();
    this.getCityList();
    this.getJobList();
  }

  // 获取省市列表
  getCityList() {
    this.publicService.GetCityList().subscribe((res: any) => {
      if (res.code === 200) {
        this.cityList = res.data;
      }
    });
  }

  // 获取职位列表
  getJobList() {
    this.publicService.GetJobList().subscribe((res: any) => {
      if (res.code === 200) {
        this.jobList = res.data;
      }
    });
  }

  // 表格列表
  getTableList() {
    this.loading = true;
    this.service
      .GetAccList(this.page.query, this.page.page, this.page.pageSize)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          this.page.data = res.data;
          this.page.totalCount = res.page.total;
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 重置列表
  resetTableList() {
    this.page.resetQuery();
    this.getTableList();
  }

  // 查看详情
  detail(record) {
    this.modal.createStatic(UserDetailComponent, { record }).subscribe(() => this.st.reload());
  }

  // 新增/编辑用户
  store(record) {
    if (record) {
      this.modal.createStatic(UserStoreComponent, { action: 2, id: record.objectId }).subscribe(() => this.st.reload());
      return;
    }
    this.modal.createStatic(UserStoreComponent, { action: 1 }).subscribe(() => this.st.reload());
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
  tableChange(e) {
    if (this.page.isPageChange(e)) {
      this.getTableList();
    }
  }
}
