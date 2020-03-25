import { Component, OnInit, Inject, AfterViewInit, Input } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'gis-charging-res-detail',
  templateUrl: './charging-res-detail.component.html',
  styleUrls: [`./charging-res-detail.component.less`],
})
export class GisChargingResDetailComponent implements OnInit, AfterViewInit {
  // 当前资源
  resource: any;

  // 当前充电资源
  currentCharge: any = {
    code: null,
    status: null,
    chargingStartTime: null,
    chargingEndTime: null,
    electricity: null,
    expectedFullChargeTime: null,
  };

  constructor(
    private _NzModalRef: NzModalRef
  ) {
  }

  ngOnInit(): void {
    console.log("当前查看资源：", this.resource);
    if (this.resource.batterys.length) {
      this.selectCharge(this.resource.batterys[0]);
    }
  }

  ngAfterViewInit() {
  }

  // 日期格式化
  dateFormat(dateTime) {
    return (
      dateTime.getFullYear() +
      '-' +
      (dateTime.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      dateTime
        .getDate()
        .toString()
        .padStart(2, '0')
    );
  }

  // 时间格式化
  timeFormat(dateTime) {
    return (
      dateTime
        .getHours()
        .toString()
        .padStart(2, '0') +
      ':' +
      dateTime
        .getMinutes()
        .toString()
        .padStart(2, '0') +
      ':' +
      dateTime
        .getSeconds()
        .toString()
        .padStart(2, '0')
    );
  }

  // 选择充电资源
  selectCharge(res) {
    this.currentCharge = res;

    if (res.chargingStartTime) {
      const date = new Date(res.chargingStartTime);
      this.currentCharge.chargingStartTime = this.dateFormat(date) + " " + this.timeFormat(date);
    }

    if (res.chargingEndTime) {
      const date = new Date(res.chargingEndTime);
      this.currentCharge.chargingEndTime = this.dateFormat(date) + " " + this.timeFormat(date);
    }

    if (res.expectedFullChargeTime) {
      const date = new Date(res.expectedFullChargeTime);
      this.currentCharge.expectedFullChargeTime = this.dateFormat(date) + " " + this.timeFormat(date);
    }
  }

  close(opt = false) {
    this._NzModalRef.destroy(opt);
  }
}

