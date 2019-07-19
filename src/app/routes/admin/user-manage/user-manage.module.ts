import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-list/user-detail/user-detail.component';

const COMPONENTS = [UserListComponent];
const COMPONENTS_NOROUNT = [UserDetailComponent];

@NgModule({
  imports: [SharedModule, UserManageRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class UserManageModule {}