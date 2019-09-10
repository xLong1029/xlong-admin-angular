## 基于g2-timeline定制的多折线图

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <g2-multi-timeline
      [data]="chartData"
      [titleMap]="{ v1: '客流量', v2: '支付数量', v3: '调试率', v4: '测试' }"
      [colorMap]="{ v1: '#1890FF', v2: '#2FC25B', v3: '#ddd', v4: 'blue' }"
      [colorMap]="{ v1: '人', v2: '笔', v3: '%', v4: '' }"
      [x]="'test'"
      [height]="200"
      slider="false"
    ></g2-multi-timeline>
  `,
})
export class DemoComponent implements OnInit {
  chartData: any[] = [];
  ngOnInit(): void {
    for (let i = 0; i < 20; i += 1) {
      this.chartData.push({
        test: (new Date().getTime()) + (1000 * 60 * 60 * 24 * i),
        v1: Math.floor(Math.random() * 100) + 1000,
        v2: Math.floor(Math.random() * 100) + 10,
        v3: Math.floor(Math.random() * 100) + 500,
        v4: Math.floor(Math.random() * 100) + 700,
      });
    }
  }
}
```
