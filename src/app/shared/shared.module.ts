import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// 第三方插件/框架
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
const THIRDMODULES = [NgZorroAntdModule, CountdownModule];

// 自定义管道
import { GraduatePipe } from './pipe/graduate.pipe';
// 自定义指令
import { PasswordValidatorDirective } from './directive/password-validator.directive';
import { ConfirmPwdValidatorDirective } from './directive/comfir-password-validator.directive';
// 图表模块
import { G2MultiTimelineModule } from './component/multi-timeline/public_api';

const CHARTMODULES = [G2MultiTimelineModule];

const COMPONENTS = [];
const DIRECTIVES = [PasswordValidatorDirective, ConfirmPwdValidatorDirective];
const PIPES = [GraduatePipe];

@NgModule({
  // 这里列出的 NgModule 所导出的可声明对象可用在当前模块内的模板中
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    ...THIRDMODULES,
    ...CHARTMODULES,
  ],
  // 属于该模块的一组组件、指令和管道（统称可声明对象）, 在这个源数据中只能声明组件、管道、指令
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  // 定义此 NgModule 中要编译的组件集，这样它们才可以动态加载到视图中
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    ...THIRDMODULES,
    ...CHARTMODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
})
export class SharedModule {}
