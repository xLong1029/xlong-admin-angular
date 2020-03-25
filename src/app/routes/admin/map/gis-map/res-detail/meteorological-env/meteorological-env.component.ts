import { Component, OnInit, OnChanges, Inject, Input } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'gis-meteorological-env',
  templateUrl: './meteorological-env.component.html',
  styleUrls: [`./meteorological-env.component.less`],
})
export class GisMeteorologicalEnvComponent implements OnInit, OnChanges {
  // 获取父组件传入值：当前资源
  @Input() resource: any;
  // 获取父组件传入值：监控类型
  @Input() monitorType: any;
  // 获取父组件传入值：当前监控类型
  @Input() currentMonitorType: any;

  // 太阳图标坐标
  sunIconCoord = { x: 0, y: 0 };
  // 轨迹圆心坐标
  circleCentreCoord = { x: 282, y: 293 }; // 实际圆心是(282, 280)，需要加上图标高度的一半
  // 轨迹半径
  radius = 280;
  // 初始位置与水平线角度
  initialAngle = Math.PI / 5;

  // 更新时间
  updateTime = '';

  // 加载效果
  loading: boolean = false;

  // 气象信息
  infoDetail: any = {
    aqi: {
      city: {
        co: "333",
        o3: null,
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
    private message: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.currentMonitorType === this.monitorType.meteorologicalEnv) {
      this.getInfo();
      setTimeout(() => {
        this.initSunView();
        this.initTimeLine();
      }, 100)
    }
  }

  ngAfterViewInit() {
  }

  // 获取气象信息
  getInfo() {
    this.loading = true;
    // https://way.jd.com/he/freeweather?city=beijing&appkey=您申请的APPKEY
    this.http
      .get(`weather?city=nanning&appkey=122bff90a579c0eff439f48f06ce1374`)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.result.HeWeather5 && res.result.HeWeather5.length) {
          this.infoDetail = res.result.HeWeather5[0];
        }
        else {
          this.message.error('获取气象信息失败');
        }
      });
  }

  // 日期格式化
  dateFormat(dateTime) {
    return (
      dateTime.getFullYear() +
      '/' +
      (dateTime.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
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

  // 初始化时刻表
  initTimeLine() {
    const date = new Date();

    this.updateTime = this.dateFormat(date) + " " + this.timeFormat(date);

    let hour = date.getHours(); // 当前时刻

    if (hour > 18) hour = 18;
    else if (hour < 6) hour = 6;

    const sunriseHour = 6; // 日出时刻
    const sunsetHour = 18; // 日落
    const division = sunsetHour - sunriseHour; // 分等分
    const eachAngle = (Math.PI - this.initialAngle * 2) / division; // 每等分角度： 3Π/5*1/12 = Π/20
    const alpha = this.initialAngle + (hour - 6) * eachAngle; // 当前位置角度： (1/5 + n/20)*Π

    // 参考公式：圆心为(a,b)的圆上某点的坐标为 (a+R*cosα, b+R*sinα)，canvas上取物体左上角坐标，要获取真实定位x和y要各自减去宽高的一半
    this.sunIconCoord.x = this.circleCentreCoord.x - this.radius * Math.cos(alpha) - 13;
    this.sunIconCoord.y = this.circleCentreCoord.y - this.radius * Math.sin(alpha) - 13;
  }

  // 初始化日出日落视图
  initSunView() {
    const canvas = document.getElementById('sunView') as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      // 获取渲染对象和它的绘画功能
      const ctx = canvas.getContext('2d');
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制半圆
      ctx.beginPath();
      const startAngle = Math.PI + this.initialAngle; // 开始点
      const endAngle = 2 * Math.PI - this.initialAngle; // 结束点
      const anticlockwise = false; // 顺时针，从右侧开始
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ccc'; // 描边样式
      ctx.setLineDash([2, 1]); // 绘制虚线
      ctx.arc(this.circleCentreCoord.x, this.circleCentreCoord.y, this.radius, startAngle, endAngle, anticlockwise); // 画圆
      ctx.stroke(); // 描边

      // 绘制直线
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 1]);
      ctx.moveTo(80, 155);
      ctx.lineTo(480, 155);
      ctx.stroke();

      // 日出/日落对象
      const sunriseImg = new Image();
      sunriseImg.src = './assets/images/img-sunrise.png';
      sunriseImg.onload = () => {
        ctx.drawImage(sunriseImg, 30, 140);
        ctx.fillStyle = '#888';
        ctx.font = '16px 微软雅黑';
        ctx.fillText('日出时间(6:00)', 0, 195);

        ctx.drawImage(sunriseImg, 495, 140);
        ctx.fillStyle = '#888';
        ctx.font = '16px 微软雅黑';
        ctx.fillText('日落时间(18:00)', 445, 195);
      };

      // 太阳对象
      const sunImg = new Image();
      sunImg.src = './assets/images/img-sun.png';
      sunImg.onload = () => {
        // 设置当前时间
        ctx.drawImage(sunImg, this.sunIconCoord.x, this.sunIconCoord.y);
      };
    }
  }
}