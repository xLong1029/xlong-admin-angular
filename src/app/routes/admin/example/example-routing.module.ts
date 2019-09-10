import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunriseAndSunsetComponent } from './sunrise-sunset/sunrise-sunset.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [{ path: '', redirectTo: 'sun' }, { path: 'sun', component: SunriseAndSunsetComponent }, { path: 'chart', component: ChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleRoutingModule {}
