import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  constructor(public http: _HttpClient) {}

  /**
   * 获取资源坐标点，包含亮度
   */
  GetLightResPoints(page: any, size: any) {
    return this.http.get(`/getLightResPoints?page=${page}&size=${size}`);
  }
  
  /**
   * 获取资源列表
   */
  GetResourcesList(page: any, size: any) {
    return this.http.get(`/getResources?page=${page}&size=${size}`);
  }

  /**
   * 获取资源坐标点
   */
  GetResourcesPoints(page: any, size: any) {
    return this.http.get(`/getResourcesPoints?page=${page}&size=${size}`);
  }
}
