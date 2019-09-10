import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { InputNumber } from '@delon/util';

declare var G2: any;
declare var DataSet: any;

export class G2MultiTimelineData {
  /** 非 `Date` 格式，自动使用 `new Date` 转换，因此，支持时间格式字符串、数字型时间戳 */
  x: Date | string | number;
  /** Y轴数据 */
  [key: string]: any;
}

@Component({
  selector: 'g2-multi-timeline',
  templateUrl: './multi-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class G2MultiTimelineComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('container', { static: false }) private node: ElementRef;
  private chart: any;

  // #region fields

  @Input() @InputNumber() delay = 0;
  @Input() title: string | TemplateRef<void>;
  @Input() data: G2MultiTimelineData[] = [];
  @Input() titleMap: object = {};
  @Input() colorMap: object = {};
  @Input() mask: string = 'HH:mm';
  @Input() position: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() @InputNumber() height = 400;
  @Input() padding: number[] = [60, 20, 40, 40];
  @Input() @InputNumber() borderWidth = 2;
  /**
   * 是否显示标题
   */
  @Input() showTitle: boolean = true;
  /**
   * 坐标X轴配置信息
   */
  @Input() axisConfigX: object = { title: false };
  /**
   * 坐标Y轴配置信息
   */
  @Input() axisConfigY: object = { title: false };
  /**
   * X轴字段名称
   */
  @Input() x: string = 'x';
  /**
   * 提示的单位名称
   */
  @Input() unitMap: object = {};

  /**
   * Y轴最大数值列表
   */
  private _tempMaxList = [];

  // #endregion

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      setTimeout(() => this.install(), this.delay),
    );
  }

  private install() {
    const { node, height, padding, unitMap, titleMap } = this;
    const chart = (this.chart = new G2.Chart({
      container: node.nativeElement,
      forceFit: true,
      height,
      padding,
    }));

    chart.axis(this.x, this.axisConfigX);

    if (!this.data || this.data.length <= 0) return;
    // 判断单位对象是否为空
    // const unitArr = Object.keys(unitMap);

    let obj = this.data[0];
    let isFirY = true;
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        if (key != this.x) {
          if (isFirY) {
            chart.axis(key, this.axisConfigY);
            isFirY = false;
          } else {
            chart.axis(key, false);
          }
          chart.line().position(`${this.x}*${key}`).tooltip(`${this.x}*${key}`, (name, value) => {
            return { name: titleMap[key], value, unit : unitMap[key]};
          });

          this._tempMaxList.push(
            [...this.data].sort((a, b) => b[key] - a[key])[0][key],
          );
        }
      }
    });

    // 每项记录的的提示模板
    chart.tooltip({
      itemTpl:
        '<li data-index={index}>' +
        '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
        '{name}: {value} {unit}' +
        '</li>', // 支持的字段 index,color,name,value..由以上tooltip回调函数定义
    });

    chart.render();

    this.attachChart();
  }

  private attachChart() {
    const {
      chart,
      height,
      padding,
      data,
      mask,
      titleMap,
      position,
      colorMap,
      borderWidth,
    } = this;
    if (!chart || !data || data.length <= 0) return;

    let _source = new Object();
    _source[this.x] = {
      type: 'timeCat',
      mask,
      tickCount: 24,
      range: [0, 1],
    };
    let legends = [];
    const max = Math.max(...this._tempMaxList);
    let obj = this.data[0];
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        if (key != this.x) {
          _source[key] = {
            alias: titleMap[key],
            max,
            min: 0,
          };
          if (this.showTitle) {
            legends.push({
              value: titleMap[key],
              fill: colorMap[key],
            });
          }
        }
      }
    });

    chart.legend({
      position,
      custom: true,
      clickable: false,
      items: legends,
    });

    // chart.legend(false);//隐藏指标别名

    //border
    chart.get('geoms').forEach(v => {
      v.color(colorMap[v.getTipName()]).size(borderWidth);
    });
    chart.set('height', height);
    chart.set('padding', padding);

    data
      .filter(v => !(v[this.x] instanceof Number))
      .forEach(v => {
        v[this.x] = +new Date(v[this.x]);
      });
    data.sort((a, b) => +a[this.x] - +b[this.x]);

    const ds = new DataSet({
      state: {
        start: data[0][this.x],
        end: data[data.length - 1][this.x],
      },
    });
    const dv = ds.createView();
    dv.source(data).transform({
      type: 'filter',
      callback: (val: G2MultiTimelineData) => {
        const time = +val[this.x];
        return time >= ds.state.start && time <= ds.state.end;
      },
    });

    chart.source(dv, _source);
    chart.repaint();
  }

  ngOnChanges(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.destroy();
        this.install();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.ngZone.runOutsideAngular(() => this.chart.destroy());
    }
  }
}
