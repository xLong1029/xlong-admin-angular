import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 登录路由守卫
import { LoginGuard } from '@guard/login.guard';
// 权限路由守卫
import { ACLGuard } from '@delon/acl';
import { GisMapComponent } from './gis-map/gis-map.component';

const routes: Routes = [
  {
    path: 'gis-map',
    component: GisMapComponent,
    canActivate: [LoginGuard, ACLGuard],
    data: { guard: { role: ['admin', 'manage', 'user'] } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class MapRoutingModule {}
