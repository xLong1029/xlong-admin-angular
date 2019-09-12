/**
 * 核对数据中是否有null值，若有则替换为字符串''
 * @param data 数据
 */
export function checkDataIsNull(data) {
  // tslint:disable-next-line: forin
  for (const i in data) {
    data[i] = data[i] == null ? '' : data[i];
  }
}
