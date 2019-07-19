import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCenterComponent } from './center/center.component';
import { AccountEditPasswordComponent } from './edit-password/edit-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'center' },
  { path: 'center', component: AccountCenterComponent },
  { path: 'edit-password', component: AccountEditPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
