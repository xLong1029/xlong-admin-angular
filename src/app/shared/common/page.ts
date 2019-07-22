/**
 * 表格分页
 */
export class Page {
  // 当前页码
  page = 1;
  // 每页数量
  pageSize = 10;
  // 数据总数
  total = 0;
  // 数据
  data = [];
  // 已选数据
  checkedData = [];

  // 分页配置
  pageConfig = {
    // 前端分页
    front: false,
    // 是否显示分页器中改变页数，默认：`false`
    showSize: true,
    // 分页器中每页显示条目数下拉框值
    pageSizes: [10, 20, 30, 50, 100],
    // 是否显示分页器中快速跳转，默认：`false`
    showQuickJumper: false,
  };
}
