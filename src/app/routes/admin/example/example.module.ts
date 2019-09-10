import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExampleRoutingModule } from './example-routing.module';

import { SunriseAndSunsetComponent } from './sunrise-sunset/sunrise-sunset.component';
import { ChartComponent } from './chart/chart.component';

const COMPONENTS = [SunriseAndSunsetComponent, ChartComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ExampleRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ExampleModule {}
