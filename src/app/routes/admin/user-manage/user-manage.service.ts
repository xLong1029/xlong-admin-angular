import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

import BmobServer from './../../../shared/bmob/bmob-server';

@Injectable()
export class UserManageService {
  constructor(public http: _HttpClient) {}

  /**
   * 获取所有账户列表
   * @param params 查询参数
   * @param pageNo 当前页码
   * @param pageNo 每页显示几条数据
   */
  GetAccList(params, pageNo, pageSize) {
    const query = BmobServer.GetQuery('Account');

    if (params && Object.keys(params).length) {
      // 筛选查询
      if (params.id) query.equalTo('objectId', '==', params.id);
      if (params.mobile) query.equalTo('mobile', '==', params.mobile);
      if (params.email) query.equalTo('email', '==', params.email);
      if (params.job) query.equalTo('job', '==', params.job);
      if (params.province) query.equalTo('province', '==', params.province);
      // tslint:disable-next-line: radix
      if (params.enabledState) query.equalTo('enabledState', '==', parseInt(params.enabledState));
      if (params.sTime) query.equalTo('createdAt', '>=', params.sTime);
      if (params.eTime) query.equalTo('createdAt', '<=', params.eTime);
    }
    return new Promise((resolve, reject) => {
      BmobServer.GetListData(query, pageNo, pageSize)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }

  /**
   * 新增账户
   * @param params 新增的参数
   */
  AddAccount(params) {
    const query = BmobServer.GetQuery('Account');
    // 默认启用
    params.enabledState = 1;
    return new Promise((resolve, reject) => {
      query.equalTo('mobile', '==', params.mobile);
      BmobServer.FindOneData(query)
        .then((res: any) => {
          if (res.data) resolve({ code: 404, msg: '手机号已存在！' });
          else {
            query.equalTo('email', '==', params.email);
            BmobServer.FindOneData(query)
              // tslint:disable-next-line: no-shadowed-variable
              .then((res: any) => {
                if (res.data) resolve({ code: 404, msg: '邮箱已存在！' });
                else {
                  BmobServer.AddOne('Account', params)
                    // tslint:disable-next-line: no-shadowed-variable
                    .then((res: any) => resolve(res))
                    .catch((err: any) => reject(err));
                }
              })
              .catch((err: any) => reject(err));
          }
        })
        .catch((err: any) => reject(err));
    });
  }

  /**
   * 获取账户信息
   * @param id 查询的objectId
   */
  GetAccInfo(id) {
    return new Promise((resolve, reject) => {
      BmobServer.GetOne('Account', id)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }

  /**
   * 修改账户信息
   * @param params 修改的参数
   * @param id 对象Id
   */
  EditAccount(params, id) {
    return new Promise((resolve, reject) => {
      BmobServer.EditOne('Account', id, params)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }

  /**
   * 删除账户
   * @param  ids 需要删除的对象的objectId
   */
  DeleteAcc(ids) {
    return new Promise((resolve, reject) => {
      BmobServer.DelMore('Account', ids)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }

  /**
   * 启用或禁用账户
   * @param params 修改的参数
   * @param ids 需要操作的对象的objectId
   */
  EnableAcc(params, ids) {
    return new Promise((resolve, reject) => {
      BmobServer.EditMore('Account', ids, params)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }
}
