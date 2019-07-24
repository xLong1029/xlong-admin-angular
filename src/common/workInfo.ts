import { _HttpClient } from '@delon/theme';

/**
 * 工作相关信息
 * 包含专业领域和职位列表内容
 */
export class WorkInfo {
  // 职位列表
  jobList = [];
  // 专业领域列表
  professionList = [];

  service: any = _HttpClient;

  constructor(http: any) {
    this.service = http;
  }

  /**
   * 获取职位列表
   */
  getJobList() {
    this.service.get('/getJob').subscribe((res: any) => {
      if (res.code === 200) {
        this.jobList = res.data;
      }
    });
  }

  /**
   * 获取专业领域列表
   */
  getProfessionList() {
    this.service.get('/getProfession').subscribe((res: any) => {
      if (res.code === 200) {
        this.professionList = res.data;
      }
    });
  }
}
