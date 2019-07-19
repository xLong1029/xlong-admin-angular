/**
 * 删除对象指定属性
 * @param obj 操作对象
 * @param uselessKeys 无用的属性
 */
export function ObjOmit(obj, uselessKeys) {
  uselessKeys.forEach(key => delete obj[key]);
  return obj;
}
