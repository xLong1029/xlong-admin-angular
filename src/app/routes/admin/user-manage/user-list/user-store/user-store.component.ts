import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { differenceInCalendarDays } from 'date-fns';
// service
import { AdminPublicService } from '../../../../public/public.service';
import { UserManageService } from '../../user-manage.service';
// utils
import { checkedFormat, cityCascaderFormat } from '@shared/utils/dataFormat';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: [`./user-store.component.less`],
})
export class UserStoreComponent implements OnInit {
  // 操作方式：1 新增；2 编辑
  action: 1 | 2;
  // 传递的ID
  id = null;
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
    profession: null,
    province: null,
    city: null,
    area: null,
    workTime: null,
    isGraduate: null,
  };

  // 加载
  loading = false;

  // 省市列表
  cityList: any[] | null = null;
  selectCity: any[] | null = null;
  // 职位列表
  jobList = [];
  // 专业领域列表
  professionList = [];
  // 选中的“专业领域”值
  professionSelected = [];

  // 今日日期
  today = new Date();
  // 禁用时间
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  constructor(
    private message: NzMessageService,
    private _NzModalRef: NzModalRef,
    public publicService: AdminPublicService,
    public service: UserManageService,
  ) {}

  ngOnInit(): void {
    this.getCityList();
    this.getJobList();
    this.getProfessionList();
  }

  // 获取省市列表
  getCityList() {
    this.publicService.GetCityList().subscribe((res: any) => {
      if (res.code === 200) {
        this.cityList = cityCascaderFormat(res.data);
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

  // 获取专业领域列表
  getProfessionList() {
    this.publicService.GetProfessionList().subscribe((res: any) => {
      if (res.code === 200) {
        this.professionList = this.professionListFormat(res.data);
        if (this.action === 2) {
          this.getDetail(this.id);
        }
      }
    });
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

          // tslint:disable-next-line: triple-equals
          if (res.data.job == '') this.editForm.job = null;

          // tslint:disable-next-line: triple-equals
          this.selectCity = res.data.province == '' ? [] : [res.data.province, res.data.city, res.data.area];

          if (res.data.profession) {
            this.professionSelected = res.data.profession.split(',');
          }
          this.professionList = checkedFormat(this.professionList, this.professionSelected);
        }
      })
      .catch((err: any) => console.log(err));
  }

  // 专业领域数据格式化
  professionListFormat(data: any = []) {
    return data.map((e: any) => {
      return {
        value: e.name,
        label: e.name,
        checked: false,
      };
    });
  }

  // 提交表单
  submit() {
    this.editForm.profession = this.professionSelected.join(',');
    // 新增
    if (this.action === 1) {
      this.service
        .AddAccount(this.editForm)
        .then((res: any) => {
          if (res.code === 200) {
            this.message.success(res.msg);
            this.close(true);
          } else {
            this.message.error(res.msg);
          }
        })
        .catch((err: any) => console.log(err));
    }
    // 编辑
    else {
      this.service
        .EditAccount(this.editForm, this.id)
        .then((res: any) => {
          if (res.code === 200) {
            this.message.success(res.msg);
            this.close(true);
          } else {
            this.message.error(res.msg);
          }
        })
        .catch((err: any) => console.log(err));
    }
  }

  // ”尚未毕业“勾选改变事件
  graduateChange(e) {
    if (e) {
      this.editForm.workTime = '';
    }
  }

  // “专业领域”勾选改变事件
  checkBoxChange(e) {
    this.professionSelected = e;
  }

  close(isRefresh) {
    this._NzModalRef.destroy(isRefresh);
  }
}
