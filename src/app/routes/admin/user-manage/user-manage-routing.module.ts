import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
// 路由守卫
import { LoginGuard } from '@guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: UserListComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class UserManageRoutingModule {}
