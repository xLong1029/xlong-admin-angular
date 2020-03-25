import { Component, OnInit, Inject, Input } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { MonitorTypeEnum } from '@shared/enum/monitor-type.enum';

@Component({
  selector: 'gis-res-detail',
  templateUrl: './res-detail.component.html',
  styleUrls: [`./res-detail.component.less`],
})
export class GisResDetailComponent implements OnInit {
  // 当前资源
  resource: any;

  // 监控类型
  monitorType = MonitorTypeEnum;

  // 当前监控类型
  currentMonitorType = this.monitorType.meteorologicalEnv;

  constructor(
    public http: HttpClient,
    private nzModalRef: NzModalRef,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.currentMonitorType);
  }

  // Tabs切换
  nzSelectChange(e) {
    // console.log(e);
  }

  close(opt = false) {
    this.nzModalRef.destroy(opt);
  }
}

