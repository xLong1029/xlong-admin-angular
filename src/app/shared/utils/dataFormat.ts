/*
 * 功能 : 封装一些数据格式化的方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-7-26
 * 版本 : version 1.0
 */

/**
 * 勾选数据格式化
 * @param checkBoxs 选项列表
 * @param data 数据列表
 */
export function checkedFormat(checkBoxs: any = [], data: any = []) {
  for (const c of checkBoxs) {
    let checked = false;
    for (const d of data) {
      if (c.value === d) {
        checked = true;
        break;
      }
    }
    c.checked = checked;
  }
  return checkBoxs;
}

/**
 * 城市联级数据格式化
 * @param data 数据列表
 */
export function cityCascaderFormat(data: any = []) {
  return data.map((province: any) => {
    // 省数据
    const p = {
      value: province.name,
      label: province.name,
      children: [],
      isLeaf: true,
    };
    if (province.childs.length) {
      p.isLeaf = false;
      p.children = province.childs.map((city: any) => {
        // 市数据
        const c = {
          value: city.name,
          label: city.name,
          children: [],
          isLeaf: true,
        };
        if (city.childs.length) {
          c.isLeaf = false;
          c.children = city.childs.map((area: any) => {
            // 区数据
            const a = {
              value: area.name,
              label: area.name,
              children: [],
              isLeaf: true,
            };
            return a;
          });
        }
        return c;
      });
    }
    return p;
  });
}
