import { Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'header-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: [`./nav-menu.component.less`],
})
export class NavMenuComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() menuList: any[] = [];

  showToolTip = false;

  constructor(private router: Router, private change: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.setToolTip();

    // 监听页面变化
    fromEvent(window, 'resize')
      .pipe()
      .subscribe(() => {
        this.setToolTip();
      });

    // 监听路由变化
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(event);

    //     this.menuLightHeight(this.menuList);
    //   }
    // });
  }

  ngAfterViewChecked(): void {
    if (this.menuList) {
      this.menuLightHeight(this.menuList);
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
    this.change.detectChanges();
  }

  // 文字提示设置
  setToolTip() {
    this.showToolTip = document.body.clientWidth < 1200 ? true : false;
    this.change.detectChanges();
  }

  gotoLink(link) {
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    this.change.detach();
  }
}
