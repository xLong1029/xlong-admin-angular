import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';

// 登录路由守卫
import { LoginGuard } from '@guard/login.guard';
// 权限路由守卫
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
  // { path: '', redirectTo: 'list' },
  {
    path: 'list',
    component: UserListComponent,
    canActivate: [LoginGuard, ACLGuard],
    data: { guard: { role: ['admin', 'manage'] } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class UserManageRoutingModule {}
