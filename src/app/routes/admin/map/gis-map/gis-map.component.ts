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
        color: '#1c1c1cff',
      },
    },
    // 背景
    {
      featureType: 'background',
      elementType: 'all',
      stylers: {
        color: '#08304aff',
      },
    },
    // 道路
    {
      featureType: 'road',
      elementType: 'all',
      stylers: {
        color: '#010100ff',
      },
    },
    // 文本填充
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: {
        color: '#aaaaaaff',
      },
    },
    // 文本描边
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: {
        color: '#000000ff',
      },
    },
    // 绿地
    // {
    //   featureType: 'green',
    //   elementType: 'all',
    //   stylers: {
    //     color: '#072031ff',
    //   },
    // },
    // 人造区域
    {
      featureType: 'manmade',
      elementType: 'all',
      stylers: {
        color: '#072031ff',
      },
    },
    // 水系
    {
      featureType: 'water',
      elementType: 'all',
      stylers: {
        color: '#021019ff',
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
    // this.modal.static(SmartcityResourcesLocateComponent).subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.clearAll();
    //       this.GetLocate(res);
    //     }
    //   }
    // );
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
      // this.service.getResByPoints(bssw.lng, bssw.lat, bsne.lng, bsne.lat).subscribe((res: any) => {

      // 这里是测试数据，请根据实际场景更换请求数据
      const res = [

      ];

      // res.forEach(element => {
      //   let p = new BMap.Point(element.Lng, element.Lat);
      //   this.createResIcon(
      //     p,
      //     element.SHResType,
      //     element.InvolveCarrier,
      //     element.RentStatus,
      //     element.SHResTypeStr,
      //     element.RCode,
      //     element.Owner,
      //     element.Id,
      //   );
      // });

      resolve();
      // console.log(res);
      // if (res.RV == 0) {
        
      //   resolve();
      // }
      // else {
      //   reject();
      // }
      // });
    });
  }

  /**
   * 生成坐标，站址编码，站址名称，铁塔类型总数，铁塔总数-监控杆塔资源
   * @param point
   * @param element
   * @param type
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

    // 5G重点规划站点
    if (element.type == 2) {
      this.setWellCoverResLine(point, element);
      this.setChargingPileResLine(point, element);
      this.setWaterResLine(point, element);
    }
  }

  // 设置监控灯杆信息弹窗
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
    centerimg.src = './assets/img/Icons/监控灯杆.png';
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
      if(element.siteName.length>21){
        opts.height = 280;
      }
      let content = `
        <div class="locate-title">重点监控区域：${element.monitorName}</div>
        <div class="locate-info">
          <div class="locate-info__left">
            <p>站址编码：${element.siteCode}</p>
            <p>站址名称：${element.siteName}</p>
            <p>经度：${element.lng} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 纬度：${element.lat}</p>
            <p>详细地址：${element.address}</p>
          </div>
          <div class="locate-info__right">
            <img src="${element.imgUrl}"/>
            <div>站地址实景</div>
          </div>
        </div>
        <div class="locate-attr">
        <span style="min-width:45px">操作：</span><div class="locate-icon-wrapper">`;

      // 重点监控区域
      if (element.type == 1) {
        content += `<div class="locate-icon" id="thermographyBtn">
            <img class="locate-icon__img" src="assets/img/gis-monitor/热成像${element.hasThermography ? "" : "（灰）"}.png"/>
            <span class="locate-icon__name ${ element.hasThermography ? 'enable' : ''}">热成像</span>
          </div>
          `
        content += `<div class="locate-icon" id="videoMonitorBtn">
          <img class="locate-icon__img" src="assets/img/gis-monitor/视频监控${element.hasVideoMonitor ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasVideoMonitor ? 'enable' : ''}">视频监控</span>
        </div>
        `
        content += `<div class="locate-icon" id="voiceIntercomBtn">
            <img class="locate-icon__img" src="assets/img/gis-monitor/语音${element.hasVoiceIntercom ? "" : "（灰）"}.png"/>
            <span class="locate-icon__name ${ element.hasVoiceIntercom ? 'enable' : ''}">语音</span>
          </div>
          `
        content += `<div class="locate-icon" id="meteorologicalEnvBtn">
            <img class="locate-icon__img" src="assets/img/gis-monitor/环境监测${element.hasMeteorologicalEnv ? "" : "（灰）"}.png"/>
            <span class="locate-icon__name ${ element.hasMeteorologicalEnv ? 'enable' : ''}">环境监测</span>
          </div>
          `
        content += `<div class="locate-icon" id="lampControlBtn">
          <img class="locate-icon__img" src="assets/img/gis-monitor/单灯控制${element.hasLampControl ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasLampControl ? 'enable' : ''}">单灯控制</span>
        </div>
        `
        content += `<div class="locate-icon" id="hubsControlBtn">
          <img class="locate-icon__img" src="assets/img/gis-monitor/集中控制${element.hasHubsControl ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasHubsControl ? 'enable' : ''}">集中控制</span>
        </div>`
      }

      // 5G重点规划站点
      if (element.type == 2) {
        content += `<div class="locate-icon" id="adScreenBtn">
          <img class="locate-icon__img" class="locate-icon" src="assets/img/gis-monitor/LED监控${element.hasAdScreen ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasAdScreen ? 'enable' : ''}">LED广告屏</span>
        </div>
        `
        content += `<div class="locate-icon" id="radiationEnvBtn">
          <img class="locate-icon__img" class="locate-icon" src="assets/img/gis-monitor/辐射环评${element.hasRadiationEnv ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasRadiationEnv ? 'enable' : ''}">辐射环评</span>
        </div>
        `
        // content += `<div class="locate-icon" id="wirelessMonitorBtn">
        //   <img class="locate-icon__img" class="locate-icon" src="assets/img/gis-monitor/无线电监控${element.hasWirelessMonitor ? "" : "（灰）"}.png"/>
        //   <span class="locate-icon__name ${ element.hasWirelessMonitor ? 'enable' : ''}">无线电监控</span>
        // </div>
        // `
        content += `<div class="locate-icon" id="broadcastBtn">
          <img class="locate-icon__img" class="locate-icon" src="assets/img/gis-monitor/应急广播${element.hasBroadcast ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasBroadcast ? 'enable' : ''}">应急广播</span>
        </div>
        `
        content += `<div class="locate-icon" id="logisticsBtn">
          <img class="locate-icon__img" class="locate-icon" src="assets/img/gis-monitor/智慧物流${element.hasLogistics ? "" : "（灰）"}.png"/>
          <span class="locate-icon__name ${ element.hasLogistics ? 'enable' : ''}">智慧物流</span>
        </div>
        `
      }
      content += `</div></div>`;

      let infoWindow = new BMap.InfoWindow(content, opts);
      bmap.openInfoWindow(infoWindow, point); //开启信息窗口

      // 打开信息窗口加载“查看详情”按钮点击事件
      setTimeout(() => {

      }, 100);
    };

    return div;
  }

  /**
   * 生成井盖资源标记
   * 
   * @param point
   * @param element
   */
  createWellCoverResIcon(point, element) {
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
      centerimg.src = `./assets/img/Icons/井盖${element.status === 1 ? "（关）" : "（开）"}.png`;
      arrow.append(centerimg);
      div.appendChild(arrow);

      bmap.getPanes().labelPane.appendChild(div);

      div.onclick = () => {
        _this.showWellCoverResDetail(true, element);
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

  // 设置井盖资源连线
  setWellCoverResLine(point, element) {
    if (element.wellCoverResources && element.wellCoverResources.length) {
      // 连线坐标点
      let linePoints = [];
      element.wellCoverResources.forEach((e) => {
        linePoints.push(new BMap.Point(element.lng, element.lat));
        linePoints.push(new BMap.Point(e.lng, e.lat));
        let p = new BMap.Point(e.lng, e.lat);
        this.createWellCoverResIcon(p, e);
      })

      // 添加连线
      var polyline = new BMap.Polyline(linePoints, { strokeColor: "#2aa515", strokeWeight: 1, strokeStyle: "dashed", strokeOpacity: 0.8 });
      this.map.addOverlay(polyline);
    }

    /* 测试数据-start */
    // const wellCoverPoints = [
    //   {
    //     lng: 111.25221588,
    //     lat: 23.41172763
    //   },
    //   {
    //     lng: 111.25225817,
    //     lat: 23.41195247
    //   },
    //   {
    //     lng: 111.25130403,
    //     lat: 23.41208646
    //   }
    // ]
    /* 测试数据-end */
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

  /**
   * 生成智能换电（充电桩）标记
   * 
   * @param point
   * @param element
   */
  createChargingPileResIcon(point, element) {
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
      centerimg.src = './assets/img/Icons/智能换电.png';
      arrow.append(centerimg);
      div.appendChild(arrow);

      bmap.getPanes().labelPane.appendChild(div);

      div.onclick = () => {
        _this.showChargingPileResDetail(true, element);
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

  // 设置智能换电（充电桩）资源连线
  setChargingPileResLine(point, element) {
    if (element.batteryCabinets && element.batteryCabinets.length) {
      // 连线坐标点
      let linePoints = [];
      element.batteryCabinets.forEach((e) => {
        linePoints.push(new BMap.Point(element.lng, element.lat));
        linePoints.push(new BMap.Point(e.lng, e.lat));
        let p = new BMap.Point(e.lng, e.lat);
        this.createChargingPileResIcon(p, e);
      })

      // 添加连线
      var polyline = new BMap.Polyline(linePoints, { strokeColor: "#e16631", strokeWeight: 1, strokeStyle: "dashed", strokeOpacity: 0.8 });
      this.map.addOverlay(polyline);
    }

    /* 测试数据-start */
    // const chargingPilePoints = [
    //   {
    //     lng: 111.25161239,
    //     lat: 23.41205693
    //   },
    //   {
    //     lng: 111.25273299,
    //     lat: 23.41205677
    //   }
    // ]
    /* 测试数据-end */
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

  /**
   * 生成水利资源标记
   * 
   * @param point
   * @param element
   */
  createWaterResIcon(point, element) {
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
      centerimg.src = './assets/img/Icons/水利资源.png';
      arrow.append(centerimg);
      div.appendChild(arrow);

      bmap.getPanes().labelPane.appendChild(div);

      div.onclick = () => {
        _this.showWaterResDetail(true, element);
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
    this.map.addOverlay(myCompOverlay);
  }

  // 设置水利资源连线
  setWaterResLine(point, element) {
    if (element.hydrologicalResources && element.hydrologicalResources.length) {
      // 连线坐标点
      let linePoints = [];
      element.hydrologicalResources.forEach((e) => {
        linePoints.push(new BMap.Point(element.lng, element.lat));
        linePoints.push(new BMap.Point(e.lng, e.lat));
        let p = new BMap.Point(e.lng, e.lat);
        this.createWaterResIcon(p, e);
      })

      // 添加连线
      var polyline = new BMap.Polyline(linePoints, { strokeColor: "#be2c86", strokeWeight: 1, strokeStyle: "dashed", strokeOpacity: 0.8 });
      this.map.addOverlay(polyline);
    }
    /* 测试数据-start */
    // // 水利数据
    // const wellCoverResources = [
    //   {
    //     lng: 111.25198687,
    //     lat: 23.41203098
    //   }
    // ]
    /* 测试数据-end */
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