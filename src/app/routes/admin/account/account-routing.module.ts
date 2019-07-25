import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCenterComponent } from './center/center.component';
import { AccountEditPasswordComponent } from './edit-password/edit-password.component';

// 路由守卫
import { LoginGuard } from '@guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'center' },
  { path: 'center', component: AccountCenterComponent, canActivate: [LoginGuard] },
  { path: 'edit-password', component: AccountEditPasswordComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AccountRoutingModule {}
