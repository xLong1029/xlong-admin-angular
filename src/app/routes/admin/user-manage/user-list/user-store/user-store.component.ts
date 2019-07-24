import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { differenceInCalendarDays } from 'date-fns';
// service
import { UserManageService } from '../../user-manage.service';
// ts
import { WorkInfo } from './../../../../../shared/common/workInfo';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: [`./user-store.component.less`],
})
export class UserStoreComponent implements OnInit {
  // 操作方式：1 新增；2 编辑
  action: 1 | 2;
  // 编辑内容
  editForm = {
    face: null,
    realname: null,
    gender: null,
    birthdate: null,
    mobile: null,
    email: null,
    companyName: null,
    job: null,
    profession: [],
    province: null,
    city: null,
    area: null,
    workTime: null,
    isGraduate: null,
  };

  // 传递的ID
  id: any = {};
  // 加载
  loading = false;

  // 省市列表
  cityList: any[] | null = null;
  selectCity: any[] | null = null;
  // 工作相关信息
  workInfo: any;

  // 今日日期
  today = new Date();
  // 禁用时间
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  constructor(private modal: NzModalRef, private http: _HttpClient, public service: UserManageService) {
    this.workInfo = new WorkInfo(http);
  }

  ngOnInit(): void {
    this.getCityList();
    this.workInfo.getJobList();
    this.workInfo.getProfessionList();

    if (this.action === 2) {
      this.getDetail(this.id);
    }
  }

  // 获取详情
  getDetail(id) {
    this.loading = true;
    this.service
      .GetAccInfo(id)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 200) {
          this.editForm = res.data;
          this.selectCity = [res.data.province, res.data.city, res.data.area];
          // tslint:disable-next-line: triple-equals
          if (res.data.job == '') this.editForm.job = null;
          // tslint:disable-next-line: triple-equals
          if (res.data.province == '') this.selectCity = [];
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 获取省市列表
  getCityList() {
    this.http.get('/getCity').subscribe((res: any) => {
      if (res.code === 200) {
        this.cityList = this.cascaderFormat(res.data);
      }
    });
  }

  // 联级数据格式化
  cascaderFormat(data: any = []) {
    return data.map((province: any) => {
      const p = {
        value: province.name,
        label: province.name,
        children: [],
        isLeaf: true,
      };
      if (province.childs.length) {
        p.isLeaf = false;
        p.children = province.childs.map((city: any) => {
          const c = {
            value: city.name,
            label: city.name,
            children: [],
            isLeaf: true,
          };
          if (city.childs.length) {
            c.isLeaf = false;
            c.children = city.childs.map((area: any) => {
              const a = {
                value: area.name,
                label: area.name,
                children: [],
                isLeaf: true,
              };
              return a;
            });
          }
          return c;
        });
      }
      return p;
    });
  }

  // 提交表单
  submit() {}

  // ”尚未毕业“勾选
  graduateChange(e) {
    if (e) {
      this.editForm.workTime = '';
    }
  }

  close() {
    this.modal.destroy();
  }
}
