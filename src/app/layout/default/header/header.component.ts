import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  navMenu = [];
  // searchToggleStatus: boolean;

  constructor(public settings: SettingsService, public menuService: MenuService, private change: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.menuService.change.subscribe(res => {
      console.log(res);
      if (res.length) {
        this.navMenu = res.filter(item => !item.group);
      }
      this.change.detectChanges();
    });
  }

  // toggleCollapsedSidebar() {
  //   this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  // }

  // searchToggleChange() {
  //   this.searchToggleStatus = !this.searchToggleStatus;
  // }

  ngOnDestroy(): void {
    this.change.detach();
  }
}
