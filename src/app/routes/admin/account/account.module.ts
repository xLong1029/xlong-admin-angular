import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountRoutingModule } from './account-routing.module';

import { AccountCenterComponent } from './center/center.component';
import { AccountEditPasswordComponent } from './edit-password/edit-password.component';

const COMPONENTS = [AccountCenterComponent, AccountEditPasswordComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, AccountRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AccountModule {}
