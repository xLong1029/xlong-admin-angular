import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-gis-map',
  templateUrl: './gis-map.component.html',
  styleUrls: [`gis-map.component.less`],
})
export class GisMapComponent implements OnInit, AfterViewInit {
  // 页面高度适配
  pageH: any = "auto";

  // 地图实例
  map: any = null;
  // 地图样式
  mapStyle = [
    // 修改道路中间的线条
    {
      featureType: 'all',
      elementType: 'all',
      stylers: {
        color: '#1d1778',
      },
    },
    // 道路
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: {
        color: '#100e5eff',
      },
    },
    // 背景
    {
      featureType: 'background',
      elementType: 'all',
      stylers: {
        color: '#1b196aff',
      },
    },
    // 文本描边
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#110f60ff',
      },
    },
    // 文本填充
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: {
        color: '#8684dbff',
      },
    },
    // 人造区域
    {
      featureType: 'manmade',
      elementType: 'all',
      stylers: {
        color: '#252374ff',
      },
    },
    // 隐藏兴趣点
    {
      featureType: 'poilabel',
      elementType: 'labels.icon',
      stylers: {
        visibility: 'off',
      },
    },
    // 隐藏地铁
    {
      featureType: 'subway',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
  ];

  // 视图枚举
  viewEnum = MapviewEnum;

  // 当前视图
  currentView = this.viewEnum.Null;

  // 资源标记Markers
  resMarkers: any = [];

  // 加载
  loading = false;

  constructor(private change: ChangeDetectorRef, private http: _HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initPage();
    this.initMap();
  }

  // 初始化内容页面
  initPage() {
    let headerH = 64;
    let docH = document.body.clientHeight;
    this.pageH = docH - headerH;
    // 强迫式变更检测，解决ExpressionChangedAfterItHasBeenCheckedError报错问题
    this.change.detectChanges();
  }

  // 初始化地图
  initMap() {
    this.map = new BMap.Map('bmap', { enableMapClick: false });
    this.map.enableScrollWheelZoom(true);
    this.map.addControl(new BMap.ScaleControl());
    // 配置地图样式
    this.map.setMapStyle({ styleJson: this.mapStyle });

    this.initMapView();
    // this.map.setMapStyle({ style: 'midnight' }); // 这个栅格显示有BUG
  }

  // 初始化地图视野
  initMapView() {
    let point = new BMap.Point(108.297233556, 22.8064929356);
    this.map.centerAndZoom(point, 7);
  }

  // 资源定位
  resourcesLocate() {
  }

  /**
   * 清除所有
   */
  clearAll() {
    // 关闭在地图上打开的信息窗口
    if (this.map.getInfoWindow()) {
      this.map.closeInfoWindow();
    }

    this.currentView = this.viewEnum.Null;
    this.clearMap();

    this.map.clearOverlays();    // 清除地图上所有覆盖物
  }

  /**
   * 清理地图（不包含路测图层）
   */
  clearMap() {
    this.clearMarkers();
  }

  /**
   * 清除Markers
   */
  clearMarkers() {
    this.resMarkers.forEach(
      f => {
        this.map.removeOverlay(f);
      }
    );
  }

  // 显示资源
  showResources() {
    this.clearAll();
    this.currentView = this.viewEnum.ShowIcon;
    this.getPointByView();
  }

  // 根据当前地图边界获取坐标点
  getPointByView() {
    let bs = this.map.getBounds(); //获取可视区域
    let bssw = bs.getSouthWest(); //可视区域左下角
    let bsne = bs.getNorthEast(); //可视区域右上角    
    this.getResByPoints(bssw, bsne);
  }

  // 获取资源坐标点
  getResByPoints(bssw, bsne) {
    return new Promise((resolve, reject) => {
    });
  }

  /**
   * 资源列表弹窗
   */
  // 弹窗可见性
  resListVisible: any = false;
  // 接收子组件传递的可见性
  setResListVisible(val: boolean) {
    this.resListVisible = val;
  }

  // 获取监控资源
  getLocateRes(res) {
    console.log("当前选中资源：", res);
    this.clearAll();

    // 关闭资源列表弹窗
    this.setResListVisible(false);

    // 显示监控灯杆资源
    let p = new BMap.Point(res.lng, res.lat);
    this.createResIcon(p, res);
    this.map.setViewport([p]);
    this.map.centerAndZoom(p, 19);
  }

  /**
   * 生成监控资源坐标
   * @param point 坐标点
   * @param element 对象
   */
  createResIcon(point, element) {
    let _this = this;

    function ComplexCustomOverlay(point) {
      this._point = point;
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function (bmap) {
      this._map = bmap;
      let div = (this._div = document.createElement('div'));
      let arrow = (this._arrow = document.createElement('div'));

      return _this.setMonitorTowerResOverlay(point, element, bmap, div, arrow);
    };
    ComplexCustomOverlay.prototype.draw = function () {
      let map = this._map;
      let pixel = map.pointToOverlayPixel(this._point);

      this._div.style.left = pixel.x - 10 + 'px';
      this._div.style.top = pixel.y - 40 + 'px';
    };

    let myCompOverlay = new ComplexCustomOverlay(point);
    this.resMarkers.push(myCompOverlay);
    this.map.addOverlay(myCompOverlay);

    // 附近资源
    this.setNearbyResLine(point, element, 1);
    this.setNearbyResLine(point, element, 2);
    this.setNearbyResLine(point, element, 3);
  }

  /**
   * 设置监控资源信息弹窗
   * @param point 坐标点
   * @param element 对象
   * @param bmap 地图
   * @param div 信息框div
   * @param arrow 信息框箭头
   */
  setMonitorTowerResOverlay(point, element, bmap, div, arrow) {
    div.style.position = 'absolute';
    // 默认情况下，纬度较低的标注会覆盖在纬度较高的标注之上，从而形成一种立体效果。通过此方法使某个标注覆盖在其他标注之上
    // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.zIndex = BMap.Overlay.getZIndex(1);

    arrow.className = '_MapIcon';
    arrow.style.position = 'relative';

    let centerimg = document.createElement('img');
    centerimg.style.width = '22px';
    centerimg.style.height = '40px';
    centerimg.src = './assets/images/map/icon-pole.png';
    arrow.append(centerimg);
    div.appendChild(arrow);

    bmap.getPanes().labelPane.appendChild(div);

    div.onclick = () => {
      let opts = {
        width: 455, // 信息窗口宽度
        height: 260, // 信息窗口高度
        // title: "信息窗口", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
      };
      if (element.siteName.length > 21) {
        opts.height = 280;
      }
      let content = `
        <div class="locate-title">${element.siteName}</div>
        <div class="locate-info">
          <div class="locate-info__left">
            <p>站址编码：${element.siteCode}</p>
            <p>站址名称：${element.siteName}</p>
            <p>经度：${element.lng} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 纬度：${element.lat}</p>
            <p>详细地址：${element.address}</p>
          </div>
          <div class="locate-info__right">
            <img src="assets/images/map/lamp.jpg"/>
            <div>站地址实景</div>
          </div>
        </div>
        <div class="locate-attr">
        <span style="min-width:45px">功能：</span><div class="locate-icon-wrapper">`;

      content += `<div class="locate-icon" id="meteorologicalEnvBtn">
            <img class="locate-icon__img" src="assets/images/map/img-env${element.hasMeteorologicalEnv ? "" : "-disable"}.png"/>
            <span class="locate-icon__name ${ element.hasMeteorologicalEnv ? 'enable' : ''}">环境监测</span>
          </div>
          `
      content += `<div class="locate-icon" id="lampControlBtn">
          <img class="locate-icon__img" src="assets/images/map/img-light-control${element.hasLampControl ? "" : "-disable"}.png"/>
          <span class="locate-icon__name ${ element.hasLampControl ? 'enable' : ''}">灯杆控制</span>
        </div>
        `
      content += `</div></div>`;

      let infoWindow = new BMap.InfoWindow(content, opts);
      bmap.openInfoWindow(infoWindow, point); //开启信息窗口

      // 打开信息窗口加载“功能”按钮点击事件
      setTimeout(() => {

      }, 100);
    };

    return div;
  }

  /**
   * 生成附近资源标记
   * 
   * @param point 坐标点
   * @param element 对象
   * @param type 1 井盖 2 智能换电 3 水力资源
   */
  createNearbyResIcon(point, element, type) {
    let _this = this;

    function ComplexCustomOverlay(point) {
      this._point = point;
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function (bmap) {
      this.map = bmap;
      let div = (this._div = document.createElement('div'));
      let arrow = (this._arrow = document.createElement('div'));

      div.style.position = 'absolute';
      // 默认情况下，纬度较低的标注会覆盖在纬度较高的标注之上，从而形成一种立体效果。通过此方法使某个标注覆盖在其他标注之上
      // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.zIndex = BMap.Overlay.getZIndex(1);

      arrow.className = '_MapIcon';
      arrow.style.position = 'relative';

      let centerimg = document.createElement('img');
      centerimg.style.width = '22px';
      centerimg.style.height = '40px';

      let imgUrl: any = "";
      switch (type) {
        case 1:
          imgUrl = `./assets/images/map/${element.status === 1 ? "icon-well-open" : "icon-well-close"}.png`;
          break;
        case 2:
          imgUrl = `./assets/images/map/icon-charge.png`;
          break;
        case 3:
          imgUrl = `./assets/images/map/icon-water-res.png`;
          break;
        default: console.log("type is error");
      }

      centerimg.src = imgUrl;
      arrow.append(centerimg);
      div.appendChild(arrow);

      bmap.getPanes().labelPane.appendChild(div);

      div.onclick = () => {
        // _this.showWellCoverResDetail(true, element);
      };

      return div;
    };
    ComplexCustomOverlay.prototype.draw = function () {
      let map = this.map;
      let pixel = map.pointToOverlayPixel(this._point);

      this._div.style.left = pixel.x - 10 + 'px';
      this._div.style.top = pixel.y - 20 + 'px';
    };

    let myCompOverlay = new ComplexCustomOverlay(point);
    this.resMarkers.push(myCompOverlay);
    this.map.addOverlay(myCompOverlay);
  }

  /**
   * 设置附近资源连线
   * 
   * @param point 坐标点
   * @param element 对象
   * @param type 1 井盖 2 智能换电 3 水力资源
   */
  setNearbyResLine(point, element, type) {
    let linePoints: any = [];
    let resources: any = null;
    let strokeColor: any = "";

    switch (type) {
      case 1:
        resources = element.wellCoverResources;
        strokeColor = "#2aa515";
        break;
      case 2:
        resources = element.batteryCabinets;
        strokeColor = "#e16631";
        break;
      case 3:
        resources = element.hydrologicalResources;
        strokeColor = "#e16631";
        break;
      default: console.log("type is error");
    }

    if (resources && resources.length) {
      resources.forEach((e) => {
        linePoints.push(new BMap.Point(element.lng, element.lat));
        linePoints.push(new BMap.Point(e.lng, e.lat));
        let p = new BMap.Point(e.lng, e.lat);
        this.createNearbyResIcon(p, e, type);
      });

      // 添加连线
      var polyline = new BMap.Polyline(linePoints, { strokeColor, strokeWeight: 1, strokeStyle: "dashed", strokeOpacity: 0.8 });
      this.map.addOverlay(polyline);
    }
  }

  // 查看井盖资源详情
  showWellCoverResDetail(visible: boolean, resource: any) {
    if (visible) {
      // this.modal.static(GisWellCoverDetail, { resource }, 800).subscribe(
      //   (res: any) => {
      //     // console.log(res);
      //   }
      // );
    }
  }

  // 查看智能换电（充电桩）资源详情
  showChargingPileResDetail(visible: boolean, resource: any) {
    if (visible) {
      // this.modal.static(GisChargingPileDetail, { resource }, 800).subscribe(
      //   (res: any) => {
      //     // console.log(res);
      //   }
      // );
    }
  }

  // 查看水利资源详情
  showWaterResDetail(visible: boolean, resource: any) {
    if (visible) {
      // this.modal.static(GisWaterManageDetail, { resource }, 800).subscribe(
      //   (res: any) => {
      //     // console.log(res);
      //   }
      // );
    }
  }
}

/**
 * 地图视图枚举
 */
enum MapviewEnum {
  /**
   * 未选择任何视图
   */
  Null = 0,
  /**
   * 行政区域视图
   */
  Region = 1,
  /**
   * 聚合视图
   */
  Cluster = 2,
  /**
   * 绘图模式开始（包括圆形选择和自定义选择）
   */
  DrawStart = 3,
  /**
   * 绘图模式结束（包括圆形选择和自定义选择）
   */
  DrawEnd = 4,
  /**
   * 资源定位 > 按经纬度定位 > 精确定位
   */
  ResourcesLocate_JQ = 5,
  /**
   * 资源定位 > 按经纬度定位 > 半径查询
   */
  ResourcesLocate_BJ = 6,
  /**
   * 显示资源
   */
  ShowIcon = 7,
}