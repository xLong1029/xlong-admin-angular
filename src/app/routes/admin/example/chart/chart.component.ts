import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

  // 电力测试数据
  powerData = [
    // {
    //   eCurrent: null, // 电流
    //   voltage: null, // 电压
    //   power: null, // 功率
    //   updateTime: null, // 更新时间
    // }
  ];

  // 折叠板样式
  panelStyle = {
    background: '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '10px',
    border: '0px'
  }

  constructor() {}

  ngOnInit() {
    this.getPowerData();
  }

  // 获取电力数据
  getPowerData(){
    // 随机能耗数据
    for (let i = 0; i < 15; i ++) {
      this.powerData.push({
        eCurrent: Math.ceil(Math.random() * 2),
        voltage: Math.ceil(Math.random() * 5),
        power: Math.ceil(Math.random() * 10),
        updateTime: (new Date().getTime()) + (1000 * 60 * 60 * 24 * i),
      });
    }
  }
}
