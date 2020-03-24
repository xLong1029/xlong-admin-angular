import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  constructor(public http: _HttpClient) {}

  /**
   * 获取资源列表
   */
  GetResourcesList(page: any, size: any) {
    return this.http.get(`/getResources?page=${page}&size=${size}`);
  }
}
