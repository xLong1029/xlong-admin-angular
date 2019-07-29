import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountRoutingModule } from './account-routing.module';

import { AccountCenterComponent } from './center/center.component';
import { AccountEditPasswordComponent } from './edit-password/edit-password.component';

import { AccountService } from './account.service';

const COMPONENTS = [AccountCenterComponent, AccountEditPasswordComponent];
const COMPONENTS_NOROUNT = [];

const SERVICES = [AccountService];

@NgModule({
  imports: [SharedModule, AccountRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [...SERVICES],
})
export class AccountModule {}
