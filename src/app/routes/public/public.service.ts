import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminPublicService {
  constructor(public http: _HttpClient) {}

  /**
   * 获取城市联级列表
   */
  GetCityList() {
    return this.http.get('/getCity');
  }

  /**
   * 获取位列表
   */
  GetJobList() {
    return this.http.get('/getJob');
  }

  /**
   * 获取专业领域列表
   */
  GetProfessionList() {
    return this.http.get('/getProfession');
  }
}
