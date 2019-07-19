import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private http: _HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(this.httpClient.get('assets/tmp/app-data.json'))
      .pipe(
        catchError(([appData]) => {
          resolve(null);
          return [appData];
        }),
      )
      .subscribe(
        ([appData]) => {
          // Application data
          const res: any = appData;
          // 应用信息：包括站点名、描述、年份
          this.settingService.setApp(res.app);
          // 用户信息：包括姓名、头像、邮箱地址
          // this.settingService.setUser(res.user);
          // ACL：设置权限为全量, https://ng-alain.com/acl/getting-started
          // this.aclService.setFull(true);
          // 设置页面后缀标题, https://ng-alain.com/theme/title
          this.titleService.suffix = res.app.name;

          // token不存在则返回登录页
          if (
            this.tokenService.get().token === '' ||
            this.tokenService.get().token == null ||
            this.tokenService.get().token === undefined
          ) {
            this.injector.get(Router).navigateByUrl('/passport/login');
            resolve(null);
            return;
          }

          // tslint:disable-next-line: no-shadowed-variable
          this.http.get('/getMenus?_allow_anonymous=true').subscribe((res: any) => {
            // tslint:disable-next-line: triple-equals
            if (res.code == 200) {
              this.menuService.add(res.data);
            }
          });
        },
        () => {},
        () => {
          resolve(null);
        },
      );
  }

  // private viaMock(resolve: any, reject: any) {
  //   // const tokenData = this.tokenService.get();
  //   // if (!tokenData.token) {
  //   //   this.injector.get(Router).navigateByUrl('/passport/login');
  //   //   resolve({});
  //   //   return;
  //   // }
  //   // mock
  //   const app: any = {
  //     name: `ng-alain`,
  //     description: `Ng-zorro admin panel front-end framework`
  //   };
  //   const user: any = {
  //     name: 'Admin',
  //     avatar: './assets/tmp/img/avatar.jpg',
  //     email: 'cipchk@qq.com',
  //     token: '123456789'
  //   };
  //   // Application information: including site name, description, year
  //   this.settingService.setApp(app);
  //   // User information: including name, avatar, email address
  //   this.settingService.setUser(user);
  //   // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
  //   this.aclService.setFull(true);
  //   // Menu data, https://ng-alain.com/theme/menu
  //   this.menuService.add([
  //     {
  //       text: 'Main',
  //       group: true,
  //       children: [
  //         {
  //           text: 'Dashboard',
  //           link: '/dashboard',
  //           icon: { type: 'icon', value: 'appstore' }
  //         },
  //         {
  //           text: 'Quick Menu',
  //           icon: { type: 'icon', value: 'rocket' },
  //           shortcutRoot: true
  //         }
  //       ]
  //     }
  //   ]);
  //   // Can be set page suffix title, https://ng-alain.com/theme/title
  //   this.titleService.suffix = app.name;

  //   resolve({});
  // }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
