import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';

@Component({
  selector: 'gis-res-detail',
  templateUrl: './res-detail.component.html',
  styleUrls: [`./res-detail.component.less`],
})
export class GisResDetailComponent implements OnInit, OnChanges {
  // 获取父组件传入值：可见性
  @Input() resDetailVisible: boolean;
  // 获取父组件传入值：当前资源
  @Input() resource: any;

  // 加载
  loading = false;

  // 灯杆信息
  lampInfo: any = {
    voltage: "12",
    current: "1.25",
    power: "15",
    lightEfficacy: "130"
  };

  // 气象信息
  envInfo: any = {
    aqi: {
      city: {
        co: null,
        o3: null,
        no2: null,
        so2: null,
        pm25: null,
        pm10: null,
        qlty: null
      }
    },
    now: {
      tmp: null,
      pcpn: null,
      pres: null,
      hum: null,
      wind: {
        dir: null,
        spd: null,
        sc: null
      }
    }
  };

  constructor(
    public http: HttpClient,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.resDetailVisible) {
      this.getEnvInfo();
    }
  }

  // 获取气象信息
  getEnvInfo() {
    this.loading = true;

    if (!environment.prod) {
      // https://way.jd.com/he/freeweather?city=beijing&appkey=您申请的APPKEY
      this.http
        .get(`${environment.WEATHER_URL}?city=nanning&appkey=122bff90a579c0eff439f48f06ce1374`)
        .subscribe((res: any) => {
          this.loading = false;
          if (res.result.HeWeather5 && res.result.HeWeather5.length) {
            this.envInfo = res.result.HeWeather5[0];
          }
          else {
            this.message.error('获取气象信息失败');
          }
        });
    }
    else {
      // 生产环境请求气象地址会跨域，写模拟数据展示
      setTimeout(() => {

        this.http
        .get(`${environment.WEATHER_URL}`)
        .subscribe((res: any) => {
          this.loading = false;
          if (res.code === 200) {
            this.envInfo = res.data;
          }
          else {
            this.message.error('获取气象信息失败');
          }
        });
      }, 800);
    }
  }

  // 控制调光
  controlLampLight(brightness1, brightness2, sn) {
    this.resource.lampInfo.brightness1 = brightness1;
    this.resource.lampInfo.brightness2 = brightness2;
    this.message.success("(模拟)指令已下发成功!");
  }
}

