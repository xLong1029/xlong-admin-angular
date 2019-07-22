/**
 * 表格分页
 */
export class Page {
  // 当前页码
  page = 1;
  // 页码总数
  pageCount = 1;
  // 每页数量
  pageSize = 10;
  // 数据总数
  totalCount = 0;
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
    // 是否显示总数据量，默认：`false`
    total: true,
  };

  /**
   * 页码改变时更新页面
   */
  resetPage(p) {
    this.pageSize = p.ps;
    // tslint:disable-next-line: prefer-conditional-expression
    if (p.type === 'ps') {
      this.page = 1;
    } else {
      this.page = p.pi;
    }
  }

  /**
   * 是否页码改变（包含每页数量跟页码）
   */
  isPageChange(event) {
    if (event.type === 'checkbox') {
      this.checkedData = event.checkbox;
    }

    if (event.type === 'radio') {
      this.checkedData.push(event.radio);
    }

    const res = event.type === 'pi' || event.type === 'ps';
    if (res) {
      this.checkedData = [];
      this.resetPage(event);
    }
    return res;
  }
}
