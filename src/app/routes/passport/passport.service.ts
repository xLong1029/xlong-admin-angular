import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class PassportService {
  constructor(public http: _HttpClient) {}

  /**
   * 登录
   * @param username 用户名
   * @param password 密码
   */
  Login(username, password) {
    return new Promise((resolve, reject) => {
      Bmob.User.login(username, password)
        .then(res =>
          resolve({
            code: 200,
            data: res,
          }),
        )
        .catch(err => reject(err));
    });
  }
}
