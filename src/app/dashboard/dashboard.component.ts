import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.less' ]
})

export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUseres();
  }

  getUseres(): void {
    // 截取第 2 到 第 5 位用户，只返回第二，第三，第四和第五位用户
    this.userService.getUsers()
      .subscribe(users => this.users = users.slice(1, 5));
  }
}
