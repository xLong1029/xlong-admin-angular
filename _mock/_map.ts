import { MockRequest } from '@delon/mock';

const resList = [
  {
    // 编号
    id: 1,
    // 精度
    lng: 108.317806,
    // 纬度
    lat: 22.818608,
    // 站址编码
    siteCode: "450107265485666666",
    // 站址名称
    siteName: "南宁江北大道交通监控杆",
    // 地址
    address: "广西省南宁市南宁江北大道",
    // 是否有广告屏
    hasAdScreen: true,
    // 是否有环境监控
    hasMeteorologicalEnv: true,
    // 气象地址
    meteorologicalEnv: "nanning",
    // 是否有灯杆监控
    hasLampControl: true,
    // 灯杆详情
    lampInfo: {
      brightness1: 57,
      brightness2: 68,
      sn: 888888,
    },
    // 井盖资源
    wellCoverResources: [
      {
        id: 1,
        uid: "BDE7EF",
        onlineTime: "2020-01-08 ,00:00:00",
        electricity: 0.5,
        lng: 108.317995,
        lat: 22.81835,
        address: "江北大道",
        // 1 打开 2 关闭
        status: 2,
        name: "江北大道市政井盖BDE7EF",
      },
      {
        id: 2,
        uid: "BDE8EF",
        onlineTime: "2020-01-08 00:00:00",
        electricity: 0.9,
        lng: 108.31759,
        lat: 22.818679,
        address: "江北大道",
        status: 1,
        name: "江北大道市政井盖BDE8EF",
      },
      {
        id: 5,
        uid: "BDE9EF",
        onlineTime: "2020-01-08 00:00:00",
        electricity: 0.8,
        lng: 108.317388,
        lat: 22.81828,
        address: "江北大道",
        status: 1,
        name: "江北大道市政井盖BDE9EF",
      }
    ],
    // 智能换电
    batteryCabinets: [
      {
        id: 1,
        windowCount: 12,
        chargingCount: 1,
        uid: "BC614E",
        // 1 设备在用 2 设备暂停使用
        status: 1,
        lng: 108.317487,
        lat: 22.819271,
        address: "东盟企业总部基地一期5G基站",
        name: "南宁江北大道-智慧换电BC614E",
        batterys: [
          {
            id: 1,
            code: 1,
            status: 2,
            chargingStartTime: "2020-03-24 08:31:00",
            chargingEndTime: "2020-03-24 15:02:00",
            electricity: 1,
            expectedFullChargeTime: null,
          },
          {
            id: 2,
            code: 2,
            status: 2,
            chargingStartTime: "2020-03-24 13:27:00",
            chargingEndTime: "2020-03-24 19:54:00",
            electricity: 1,
            expectedFullChargeTime: null,
          },
          {
            id: 3,
            code: 3,
            status: 1,
            chargingStartTime: "2020-03-24 17:03:00",
            chargingEndTime: null,
            electricity: 0.9489036,
            expectedFullChargeTime: "2020-03-24 23:06:00",
          },
          {
            id: 4,
            code: 4,
            status: 2,
            chargingStartTime: "2020-03-24 10:02:00",
            chargingEndTime: "2020-03-24 16:04:00",
            electricity: 1,
            expectedFullChargeTime: null,
          },
          {
            id: 5,
            code: 5,
            status: 1,
            chargingStartTime: "2020-03-24 17:03:00",
            chargingEndTime: null,
            electricity: 0.457,
            expectedFullChargeTime: "2020-03-25 23:06:00",
          },
          {
            id: 6,
            code: 6,
            status: 3,
            chargingStartTime: null,
            chargingEndTime: null,
            electricity: null,
            expectedFullChargeTime: null,
          },
          {
            id: 7,
            code: 7,
            status: 2,
            chargingStartTime: "2020-03-24 15:08:00",
            chargingEndTime: "2020-03-24 21:16:00",
            electricity: 1,
            expectedFullChargeTime: null,
          },
          {
            id: 8,
            code: 8,
            status: 3,
            chargingStartTime: null,
            chargingEndTime: null,
            electricity: null,
            expectedFullChargeTime: null,
          },
          {
            id: 9,
            code: 9,
            status: 3,
            chargingStartTime: null,
            chargingEndTime: null,
            electricity: null,
            expectedFullChargeTime: null,
          },
          {
            id: 10,
            code: 10,
            status: 2,
            chargingStartTime: "2020-03-24 16:08:00",
            chargingEndTime: "2020-03-24 22:16:00",
            electricity: 1,
            expectedFullChargeTime: null,
          },
          {
            id: 11,
            code: 11,
            status: 3,
            chargingStartTime: null,
            chargingEndTime: null,
            electricity: null,
            expectedFullChargeTime: null,
          },
          {
            id: 12,
            code: 12,
            status: 3,
            chargingStartTime: null,
            chargingEndTime: null,
            electricity: null,
            expectedFullChargeTime: null,
          }
        ]
      }
    ],
    // 水利资源
    waterResources: [
      {
        id: 1,
        uid: "BC615F",
        lng: 108.317864,
        lat: 22.818188,
        onlineTime: "2020-01-08 17:29:03",
        address: "水文监测",
        // 1 检测中 2 已停用
        status: 1,
        electricity: 0.4,
        waterLevel: 3,
        waterQuality: "Ⅱ",
        ph: 6.9,
        residualChlorine: 0.43,
        ntu: 2.8,
        demoResourceId: 22,
        name: "水文监测",
      }
    ]
  },
  {
    id: 2,
    lng: 109.316713,
    lat: 21.752461,
    siteCode: "450107265485888888",
    siteName: "北海合浦县XX高速站点",
    address: "广西省北海市合浦县XX高速",
    hasAdScreen: false,
    hasMeteorologicalEnv: true,
    meteorologicalEnv: "beihai",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 35,
      brightness2: 35,
      sn: 666666,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 3,
    lng: 111.25128377,
    lat: 23.41186247,
    siteCode: "450107265485555555",
    siteName: "梧州XX街道监控点",
    address: "广西省梧州市XX街道",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "wuzhou",
    hasLampControl: true,
    // 灯杆详情
    lampInfo: {
      brightness1: 90,
      brightness2: 85,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: [
      {
        id: 1,
        uid: "BC615F",
        lng: 111.25158477,
        lat: 23.41187647,
        onlineTime: "2020-01-08 17:29:03",
        address: "水文监测",
        // 1 检测中 2 已停用
        status: 2,
        electricity: 0.4,
        waterLevel: 3,
        waterQuality: "Ⅱ",
        ph: 6.9,
        residualChlorine: 0.43,
        ntu: 2.8,
        demoResourceId: 22,
        name: "水文监测",
      }
    ]
  },
  {
    id: 4,
    lng: 108.311163,
    lat: 22.822094,
    siteCode: "450107265485777777",
    siteName: "南宁新阳路路灯灯杆",
    address: "广西省南宁市新阳路",
    hasAdScreen: true,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 0,
      brightness2: 0,
      sn: 999999,
    },
    wellCoverResources: [
      {
        id: 3,
        uid: "BDE7EF",
        onlineTime: "2020-01-08 ,00:00:00",
        electricity: 0.5,
        lng: 108.311379,
        lat: 22.822199,
        address: "新阳路",
        // 1 打开 2 关闭
        status: 2,
        name: "新阳路井盖BDE7RF",
      },
      {
        id: 4,
        uid: "BDE8EF",
        onlineTime: "2020-01-08 00:00:00",
        electricity: 0.9,
        lng: 108.311163,
        lat: 22.822499,
        address: "新阳路",
        status: 1,
        name: "新阳路井盖BDRTRF",
      },
    ],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 5,
    lng: 108.321163,
    lat: 22.823094,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据一",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 30,
      brightness2: 35,
      sn: 222222,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 6,
    lng: 108.361163,
    lat: 23.829094,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据二",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 20,
      brightness2: 25,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 7,
    lng: 108.969163,
    lat: 22.729094,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据三",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 0,
      brightness2: 0,
      sn: 333333,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 8,
    lng: 108.981401,
    lat: 22.965941,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据四",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 15,
      brightness2: 60,
      sn: 555555,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 9,
    lng: 109.265409,
    lat: 22.699604,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据五",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 67,
      brightness2: 80,
      sn: 777777,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 10,
    lng: 109.827677,
    lat: 22.539472,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据六",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 97,
      brightness2: 80,
      sn: 111111,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 11,
    lng: 110.178375,
    lat: 22.660923,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据七",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 90,
      brightness2: 80,
      sn: 812238,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 12,
    lng: 109.536769,
    lat: 22.273238,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据八",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 20,
      brightness2: 40,
      sn: 356345,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 13,
    lng: 109.476978,
    lat: 22.204725,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据九",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 10,
      brightness2: 10,
      sn: 452123,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 14,
    lng: 109.458581,
    lat: 22.106179,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据十",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 0,
      brightness2: 0,
      sn: 874567,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 15,
    lng: 108.745686,
    lat: 22.191875,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据十一",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 0,
      brightness2: 0,
      sn: 982362,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 16,
    lng: 109.725342,
    lat: 23.949462,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据十二",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 58,
      brightness2: 67,
      sn: 238645,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  },
  {
    id: 17,
    lng: 109.775934,
    lat: 23.347787,
    siteCode: "450107265485XXXXXX",
    siteName: "聚点测试数据十三",
    address: "暂无描述",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
    // 灯杆详情
    lampInfo: {
      brightness1: 35,
      brightness2: 30,
      sn: 761234,
    },
    wellCoverResources: [],
    batteryCabinets: [],
    waterResources: []
  }
];

// 根据页码获取列表
function getResListByPage(page, size) {
  return {
    code: 200, msg: 'ok', data: resList.slice((page - 1) * size, page * size), page: {
      page,
      size,
      total: resList.length
    }
  };
}

export const Map = {
  // 打点资源
  '/getResources': (req: MockRequest) => getResListByPage(req.queryString.page, req.queryString.size),
};
