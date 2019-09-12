/**
 * 数据百分比格式化，保留2位小数
 * @param data 数据
 */
export function percentFormat(data: any): number {
  if (!data) return null;
  else return parseFloat((data * 100).toFixed(2));
}
