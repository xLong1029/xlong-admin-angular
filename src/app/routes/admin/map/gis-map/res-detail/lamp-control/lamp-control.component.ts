import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Inject,
  Input,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'gis-lamp-control',
  templateUrl: './lamp-control.component.html',
  styleUrls: [`./lamp-control.component.less`],
})
export class GisLampControlComponent implements OnInit, OnChanges, OnDestroy {
  // 获取父组件传入值：当前资源
  @Input() resource: any;
  // 获取父组件传入值：监控类型
  @Input() monitorType: any;
  // 获取父组件传入值：当前监控类型
  @Input() currentMonitorType: any;

  // 灯杆状态信息
  lampInfo = {
    status: 0, // 灯杆状， 1 开灯 2 关灯 3故障
    battery: null, // 电量
    uid: null, // 设备id
    companyname: null, // 企业名称
    devicetype: null, // 中继类型
    longitude: null, // 经度
    latitude: null, // 纬度
    // addr: null, // 地址
    // alias: null, // 终端别名
  };

  // 开关值
  switchValue = 0;
  beforeSwitchValue = 0;
  // 亮度值
  lightValue = 0; // 亮度 1 低 2 中 3 高
  beforeLightValue = 0;

  // 加载灯状态
  loading: boolean = false;
  // 第一次加载
  firstLoading: boolean = false;

  // 定时器
  timer: any = null;
  startTimer: boolean = false;

  // 视频url
  videoUrl: any = null;

  constructor(
    private message: NzMessageService,
    public http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }

  ngOnInit(): void {
    this.firstLoading = true;
  }

  ngOnChanges() {
    if (this.currentMonitorType === this.monitorType.lampControl) {
      this.firstLoading = true;
      // 梧州灯杆
      if (this.resource.lampType === 1) {
        this.startTimer = true;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.videoUrl);

        this.getLightStatusByCtrl();
        this.getLightStatus();
        this.getLightDetail();
      }
    } else {
      this.clearTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
    this.startTimer = false;
  }

  // 灯杆状态
  getLightStatus() {
    this.http
      .get(`api/light/status?uid=${this.resource.lampUid}`)
      .subscribe((res: any) => {
        this.lampInfo.battery = res.data[0].battery
          ? (res.data[0].battery + 150) / 100
          : '--';
        // console.log(res);
      });
  }

  // 灯杆详情
  getLightDetail() {
    this.http
      .get(`api/light/lightdetail?uid=${this.resource.lampUid}`)
      .subscribe((res: any) => {
        this.lampInfo.uid = res.data[0].uid;
        this.lampInfo.companyname = res.data[0].companyname;
        this.lampInfo.devicetype = res.data[0].devicetype;
        this.lampInfo.longitude = res.data[0].longitude;
        this.lampInfo.latitude = res.data[0].latitude;
        // console.log(res);
      });
  }

  // 通过数据透传获取状态
  getLightStatusByCtrl() {
    console.log('正在尝试获取灯杆状态...');

    this.loading = true;

    this.http
      .get(`api/light/status-by-ctrl?uid=${this.resource.lampUid}`)
      .subscribe((res: any) => {
        if (res.status === 0) {
          this.firstLoading = false;
          this.loading = false;

          this.lampInfo.status = res.data[0].switchStatus;

          this.switchValue = res.data[0].switchStatus;
          this.beforeSwitchValue = res.data[0].switchStatus;
          this.lightValue = res.data[0].dimmingRating;
          this.beforeLightValue = res.data[0].dimmingRating;
        }
        if (!this.startTimer) return;
        // 2秒后重新请求一次
        this.timer = setTimeout(() => {
          this.getLightStatusByCtrl();
        }, 2000);
      });
  }
  // 重新获取灯杆状态
  regainLightStatusByCtrl() {

  }

  // 控制灯开关
  controlSwitch(type) {
    const url =
      type === 1 ? 'api/light/ctrllightopen' : 'api/light/ctrllightclose';

    if (type === 2) {
      this.lightValue = 0;
    }

    this.http
      .post(url, { uid: this.resource.lampUid })
      .subscribe((res: any) => {
        this.message.success('指令已下发，数秒后生效');
      });
  }

  // 开关设置
  setSwitchValue(val) {
    this.lampInfo.status = val;
    this.switchValue = val;
  }

  // 控制灯亮度
  controlLight(level) {
    this.http
      .post('api/light/ctrllightlevel', { uid: this.resource.lampUid, level })
      .subscribe((res: any) => {
        this.message.success('指令已下发，数秒后生效');
      });
  }

  // 亮度设置
  setLightValue(val) {
    this.lightValue = val;
  }
}
