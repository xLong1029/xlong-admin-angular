import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { MapService } from './map.service';

import { MapRoutingModule } from './map-routing.module';

import { GisMapComponent } from './gis-map/gis-map.component';
import { GisResListComponent } from './gis-map/res-list/res-list.component';
import { GisWellResDetailComponent } from './gis-map/well-res-detail/well-res-detail.component';
import { GisChargingResDetailComponent } from './gis-map/charging-res-detail/charging-res-detail.component';
import { GisWaterResDetailComponent } from './gis-map/water-res-detail/water-res-detail.component';
import { GisResDetailComponent } from './gis-map/res-detail/res-detail.component';

const COMPONENTS = [GisMapComponent];
const COMPONENTS_NOROUNT = [GisResListComponent, GisWellResDetailComponent, GisChargingResDetailComponent, GisWaterResDetailComponent, GisResDetailComponent];

const SERVICES = [MapService];

@NgModule({
  imports: [SharedModule, MapRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [...SERVICES],
})
export class MapModule { }
