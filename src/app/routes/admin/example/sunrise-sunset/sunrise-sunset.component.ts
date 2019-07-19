import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: [`./sunrise-sunset.component.less`],
})
export class SunriseAndSunsetComponent implements OnInit {
  // 当前日期
  currentDate = null;
  // 当前时刻
  currentHour = 0;
  // 太阳图标坐标
  sunIconCoord = { x: 0, y: 0 };
  // 轨迹圆心坐标
  circleCentreCoord = { x: 282, y: 293 }; // 实际圆心是(282, 280)，需要加上图标高度的一半
  // 轨迹半径
  radius = 280;
  // 初始位置与水平线角度
  initialAngle = Math.PI / 5;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.initSunView();
      this.initTimeLine();
    }, 100);
  }

  // 初始化时刻表
  initTimeLine() {
    this.currentDate = new Date();
    this.currentHour = this.currentDate.getHours(); // 当前时刻
    this.locateSun(this.currentHour);
  }

  // 定位太阳位置
  locateSun(hour) {
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
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');

      // 绘制半圆
      ctx.beginPath();
      const startAngle = Math.PI + this.initialAngle; // 开始点
      const endAngle = 2 * Math.PI - this.initialAngle; // 结束点
      const anticlockwise = false; // 顺时针，从右侧开始
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ddd'; // 描边样式
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
        ctx.font = '14px 微软雅黑';
        ctx.fillText('日出时间', 18, 190);

        ctx.drawImage(sunriseImg, 495, 140);
        ctx.fillStyle = '#888';
        ctx.font = '14px 微软雅黑';
        ctx.fillText('日落时间', 485, 190);
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

  // 清除画布
  clearCanvas() {
    const canvas = document.getElementById('sunView') as HTMLCanvasElement;
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // 测试日出日落时刻效果
  test() {
    this.clearCanvas();
    this.locateSun(this.currentHour);
    this.initSunView();
  }
}
