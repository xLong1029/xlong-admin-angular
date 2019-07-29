import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

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
    { title: '复选框', type: 'checkbox', index: 'objectId' },
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
        {
          text: '删除',
          pop: true,
          popTitle: '删除后不可撤销，确定要删除吗？',
          click: record => {
            this.delete(record);
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
    private message: NzMessageService,
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
    this.modal.createStatic(UserDetailComponent, { record }).subscribe();
  }

  // 新增/编辑用户
  store(record) {
    if (record) {
      this.modal.createStatic(UserStoreComponent, { action: 2, id: record.objectId }).subscribe(res => {
        if (res) {
          this.getTableList();
        }
      });
      return;
    }
    this.modal.createStatic(UserStoreComponent, { action: 1 }).subscribe(res => {
      if (res) {
        this.getTableList();
      }
    });
  }

  // 删除用户
  delete(record = null) {
    let ids = [];
    if (record) {
      ids.push(record.objectId);
    } else {
      ids = this.page.checkedIds;
    }
    this.service
      .DeleteAcc(ids)
      .then((res: any) => {
        if (res.code === 200) {
          this.getTableList();

          setTimeout(() => {
            this.message.success(res.msg);
          }, 300);
        } else {
          this.message.error(res.msg);
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 启/禁用用户
  enableOrDisable(enabledState = 1) {
    this.service
      .EnableAcc({ enabledState }, this.page.checkedIds)
      .then((res: any) => {
        if (res.code === 200) {
          this.getTableList();

          setTimeout(() => {
            this.message.success(res.msg);
          }, 300);
        } else {
          this.message.error(res.msg);
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 表格变化回调
  tableChange(e) {
    if (this.page.isPageChange(e)) {
      this.getTableList();
    }
  }
}
