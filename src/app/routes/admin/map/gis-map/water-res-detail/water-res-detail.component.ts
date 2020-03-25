import { Component, OnInit, Inject, Input } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Component({
  selector: 'gis-water-res-detail',
  templateUrl: './water-res-detail.component.html',
  styleUrls: [`./water-res-detail.component.less`],
})
export class GisWaterResDetailComponent implements OnInit {
  // 当前资源
  resource: any;

  constructor(
    public http: HttpClient,
    private nzModalRef: NzModalRef,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  ngOnInit(): void {
  }

  close(opt = false) {
    this.nzModalRef.destroy(opt);
  }
}

