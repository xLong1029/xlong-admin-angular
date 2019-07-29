import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunriseAndSunsetComponent } from './sunrise-sunset/sunrise-sunset.component';

const routes: Routes = [{ path: '', redirectTo: 'sun' }, { path: 'sun', component: SunriseAndSunsetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleRoutingModule {}
