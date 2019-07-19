import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
// import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// home pages
import { HomeComponent } from './admin/home/home.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// import { UserRegisterComponent } from './passport/register/register.component';
// import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
// import { UserLockComponent } from './passport/lock/lock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { title: '主页' } },
      {
        path: 'account',
        data: { title: '个人账户' },
        loadChildren: () => import('./admin/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'example',
        data: { title: '组件示例' },
        loadChildren: () => import('./admin/example/example.module').then(m => m.ExampleModule),
      },
      {
        path: 'user-manage',
        data: { title: '用户管理' },
        loadChildren: () => import('./admin/user-manage/user-manage.module').then(m => m.UserManageModule),
      },
      {
        path: 'exception',
        data: { title: '页面有误' },
        loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule),
      },
    ],
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      // { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
      // { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
      // { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
