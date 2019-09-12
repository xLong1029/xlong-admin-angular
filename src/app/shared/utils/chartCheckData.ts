/**
 * 核对图表数据是否为空
 * @param data 图表数据
 * @param keyName 键值对名称，用于核对键值，例如对应图表数据字段为：'name'和'sex'，需传入['name', 'sex']
 */
export function chartCheckData(data: Array<any>, keyName: Array<any>): boolean {
  if (!data || data.length <= 0 || !keyName) return false;

  // 记录所有键值对值为0的数据
  let zeroNum = 0;
  data.forEach(e => {
    let tempCount = 0;
    keyName.forEach(k => {
      if (e[k] === 0) {
        tempCount++;
      }
    });
    if (tempCount === keyName.length) {
      zeroNum++;
    }
  });
  if (zeroNum === data.length) return false;
  else return true;
}
