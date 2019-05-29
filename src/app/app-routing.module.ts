import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserDetailComponent }  from './user-detail/user-detail.component';

// 配置路由
const routes: Routes = [
  // 默认路由
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "users", component: UsersComponent },
  { path: "detail/:id", component: UserDetailComponent }
];

@NgModule({
  // 首先初始化路由器，让它开始监听浏览器中的地址变化
  imports: [RouterModule.forRoot(routes)],
  // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用
  exports: [RouterModule]
})
export class AppRoutingModule {}
