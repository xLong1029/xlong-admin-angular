import { MockRequest } from '@delon/mock';

const resList = [
  {
    // 编号
    id: 1,
    // 精度
    lng: 108.38393078,
    // 纬度
    lat: 22.82651356,
    // 站址编码
    siteCode: "450107265485666666",
    // 站址名称
    siteName: "南宁火车站5G站点",
    // 地址
    address: "广西省南宁市南宁火车站出站口",
    // 是否有广告屏
    hasAdScreen: false,
    // 是否有环境监控
    hasMeteorologicalEnv: false,
    // 气象地址
    meteorologicalEnv: "nanning",
    // 是否有灯杆监控
    hasLampControl: false,
  },
  {
    id: 2,
    lng: 109.312142,
    lat: 21.756134,
    siteCode: "450107265485888888",
    siteName: "北海合浦县XX高速监控点",
    address: "北海合浦县XX高速",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "beihai",
    hasLampControl: false,
  },
  {
    id: 3,
    lng: 108.31205521,
    lat: 22.83710213,
    siteCode: "450107265485555555",
    siteName: "梧州XX街道监控点",
    address: "广西省梧州市XX街道",
    hasAdScreen: false,
    hasMeteorologicalEnv: false,
    meteorologicalEnv: "nanning",
    hasLampControl: false,
  },
  {
    id: 4,
    lng: 108.31124265,
    lat: 22.83739329,
    siteCode: "450107265485777777",
    siteName: "南宁东站监控站点",
    address: "广西省南宁市南宁东站出站口",
    hasAdScreen: false,
    hasMeteorologicalEnv: true,
    meteorologicalEnv: "nanning",
    hasLampControl: true,
  }
];

// 根据页码获取列表
function getResListByPage(page, size) {
  return { code: 200, msg: 'ok', data: resList.slice((page - 1) * size, page * size), page: {
    page,
    size,
    total: resList.length
  } };
}

export const Map = {
  // 打点资源
  '/getResources': (req: MockRequest) => getResListByPage(req.queryString.page, req.queryString.size),
};
