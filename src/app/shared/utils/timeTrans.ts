/**
 * 根据时间辍转换对应的时间 如 yyyy-MM-dd HH:mm:ss  yyyy-MM-dd
 * @param date 时间 辍
 * @param format 时间格式 默认返回年月日时分秒 按照的格式化是 yyyy-MM-dd HH:mm:ss
 * @param timeWord 默认返回2018年01月15日 16:26:30  这种  如填写 - 的。则返回 2018-01-15 16:26:30
 */
export function timeTrans(date: number, format: string = 'yyyy-MM-dd HH:mm:ss', timeWord: string = '') {
  date = date.toString().length === 13 ? date : date * 1000;
  const time = new Date(date); /*如果date为13位不需要乘1000 */
  const YType = timeWord === '' ? '年' : timeWord;
  const MType = timeWord === '' ? '月' : timeWord;
  const DType = timeWord === '' ? '日' : '';
  let dataValue = '';
  const Y = time.getFullYear() + YType;
  const M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + MType;
  const D = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + DType;
  const h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':';
  const m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':';
  const s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  switch (format) {
    case 'yyyy-MM-dd HH:mm:ss':
      dataValue = Y + M + D + h + m + s;
      break;
    case 'yyyy':
      dataValue = time.getFullYear().toString();
      break;
    case 'MM':
      dataValue = M.substring(0, M.length - 1);
      break;
    case 'dd':
      dataValue = D.substring(0, D.length - 1);
      break;
    case 'yyyy-MM':
      dataValue = Y + M.substring(0, M.length - 1);
      break;
    case 'yyyy-MM-dd':
      dataValue = Y + M + D;
      break;
    case 'MM-dd':
      dataValue = M + D.substring(0, D.length - 1);
      break;
    case 'HH':
      dataValue = h.substring(0, h.length - 1);
      break;
    case 'mm':
      dataValue = m.substring(0, m.length - 1);
      break;
    case 'ss':
      dataValue = s.toString();
      break;
    case 'HH:mm':
      dataValue = h + m.substring(0, m.length - 1);
      break;
    case 'HH:mm:ss':
      dataValue = h + m + s;
      break;
    case 'mm:ss':
      dataValue = m + s;
      break;
    default:
      throw new Error('没有找到对应的时间');
  }
  return dataValue;
}
