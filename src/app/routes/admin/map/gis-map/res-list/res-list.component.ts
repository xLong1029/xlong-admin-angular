import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { STColumn } from '@delon/abc';

// service
import { MapService } from '../../map.service';
// ts
import { Page } from '@common/page';

@Component({
  selector: 'gis-res-list',
  templateUrl: './res-list.component.html',
  styleUrls: [`res-list.component.less`],
})
export class GisResListComponent implements OnInit {
  // 获取父组件传入值：可见性
  @Input() resListVisible: boolean;
  // 输出值给父组件：可见性
  @Output() private getResListVisible = new EventEmitter<boolean>();

  // 获取父组件传入值: 监控资源
  // @Input() tableData: any;
  // 输出值给父组件：选中定位资源
  @Output() private getLocateRes = new EventEmitter<any>();

  // 页码
  page = new Page();
  // 表格列
  columns: STColumn[] = [
    { title: '站址名称', render: 'siteName', width: 150 },
    { title: '挂载功能', render: 'function', width: 200 },
    { title: '关联资源', render: 'res', width: 150 },
    { title: '站址编码', index: 'siteCode', width: 150 },
    { title: '地址', index: 'address', width: 150 },
  ];

  constructor(
    public service: MapService,
  ) { }

  ngOnInit(): void {
    this.getTableList();
  }

  // 表格列表
  getTableList() {
    this.service.GetResourcesList(this.page.page, this.page.pageSize).subscribe((res: any) => {
      if (res.code === 200) {
        this.page.data = res.data;
        this.page.totalCount = res.page.total;
      }
    });
  }

  // 修改可见性
  setResListVisible(val: boolean) {
    this.getResListVisible.emit(val); // 传递可见性给父组件
  }

  // 表格变化回调e
  tableChange(e) {
    if (e.type == 'click') {
      if (e.click.item.id) {
        this.getLocateRes.emit(e.click.item); // 传递定位资源给父组件
        return;
      }
    }
    if (this.page.isPageChange(e)) {
      this.getTableList();
    }
  }
}