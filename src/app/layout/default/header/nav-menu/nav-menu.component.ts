import { Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '@delon/theme';

@Component({
  selector: 'header-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: [`./nav-menu.component.less`],
})
export class NavMenuComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  // 菜单列表
  menuList = [];
  // 是否显示提示文字
  showToolTip = false;

  constructor(private router: Router, public menuService: MenuService, private change: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.setToolTip();

    // 监听页面变化
    fromEvent(window, 'resize')
      .pipe()
      .subscribe(() => {
        this.setToolTip();
      });

    // angular+ng-alain 8.x版本已包含监听路由改变处理，不用再自行监听
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(event);

    //     this.menuLightHeight(this.menuService);
    //   }
    // });
  }

  ngAfterViewChecked(): void {
    if (this.menuService.menus && this.menuService.menus.length) {
      this.menuLightHeight(this.menuService.menus);
      this.menuList = this.menuService.menus.filter(item => !item.group);

      if (!this.change['destroyed']) {
        this.change.detectChanges();
      }
    }
  }

  // 菜单高亮设置
  menuLightHeight(menu) {
    menu.map(item => {
      item.isSelected = item.link === this.router.url ? true : false;

      // 包含二级
      if (item.link == null || item.link === '') {
        item.children.map(child => {
          child.isSelected = child.link === this.router.url ? true : false;
        });
      }
    });
  }

  // 文字提示设置
  setToolTip() {
    const menuList: any = document.getElementsByClassName("menu-list");
    if (menuList.length) {
      this.showToolTip = document.body.clientWidth < 1200 ? true : false;
      this.change.detectChanges();

      if (!this.change['destroyed']) {
        this.change.detectChanges();
      }
    }
  }

  gotoLink(link) {
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    this.change.detach();
  }
}
