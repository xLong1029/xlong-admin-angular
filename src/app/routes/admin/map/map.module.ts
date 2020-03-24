import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { GisMapComponent } from './gis-map/gis-map.component';
import { MapService } from './map.service';
import { MapRoutingModule } from './map-routing.module';
import { GisResListComponent } from './gis-map/res-list/res-list.component';

const COMPONENTS = [GisMapComponent, GisResListComponent];
const COMPONENTS_NOROUNT = [];

const SERVICES = [MapService];

@NgModule({
  imports: [SharedModule, MapRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [...SERVICES],
})
export class MapModule {}
