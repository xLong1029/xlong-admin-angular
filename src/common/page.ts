/**
 * 表格分页
 */
export class Page {
  // 数据
  data = [];
  // 已选数据
  checkedData = [];

  // 当前页码
  page = 1;
  // 页码总数
  pageCount = 1;
  // 每页数量
  pageSize = 10;
  // 数据总数
  totalCount = 0;

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

  // 查询条件
  query: any = {};

  /**
   * 构造函数
   * @param params 筛选参数，例如：{ name : null , id : null }
   */
  constructor(params: any = {}) {
    this.query = params;
  }

  /**
   * 页码改变时更新页面
   */
  resetPage(event) {
    this.pageSize = event.ps;
    // tslint:disable-next-line: prefer-conditional-expression
    if (event.type === 'ps') {
      this.page = 1;
    } else {
      this.page = event.pi;
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

  /**
   * 重置查询
   * @param params 筛选参数（不传入则参数默认设置为null）
   */
  resetQuery(params: any = null) {
    this.page = 1;

    if (params) {
      this.query = params;
    } else {
      if (this.query) {
        Object.keys(this.query).forEach(key => {
          this.query[key] = null;
        });
      }
    }
  }
}
