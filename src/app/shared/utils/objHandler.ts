/*
 * 功能 : 封装处理对象的方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-7-26
 * 版本 : version 1.0
 */

/**
 * 删除对象指定属性
 * @param obj 操作对象
 * @param uselessKeys 无用的属性
 */
export function ObjOmit(obj, uselessKeys) {
  uselessKeys.forEach(key => delete obj[key]);
  return obj;
}
