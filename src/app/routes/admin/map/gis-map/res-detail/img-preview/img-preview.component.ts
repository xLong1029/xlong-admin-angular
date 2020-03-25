import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { _HttpClient,  } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Component({
  selector: 'gis-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: [`./img-preview.component.less`],
})
export class GisImgPreviewComponent implements OnInit {
  // 获取父组件传入值：弹窗可见性
  @Input() imgPreviewVisible: boolean;
  // 获取父组件传入值：图片地址
  @Input() imgUrl: any; 
  // 输出值给父组件：可见性
  @Output() private getImgPreviewVisible = new EventEmitter<boolean>();

  constructor(
    public http: HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  ngOnInit(): void {
  }

  // 关闭弹窗
  close() {
    console.log(2);
    this.getImgPreviewVisible.emit(false); // 传递可见性给父组件
  }
}
