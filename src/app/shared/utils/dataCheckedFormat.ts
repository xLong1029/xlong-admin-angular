/**
 * 勾选数据格式化
 * @param checkBoxs 选项列表
 * @param data 数据列表
 */
export function dataCheckedFormat(checkBoxs: any = [], data: any = []) {
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
