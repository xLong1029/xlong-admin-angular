import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  navMenu = [];
  // searchToggleStatus: boolean;

  constructor(public settings: SettingsService) {}

  ngOnInit() {}

  // toggleCollapsedSidebar() {
  //   this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  // }

  // searchToggleChange() {
  //   this.searchToggleStatus = !this.searchToggleStatus;
  // }
}
