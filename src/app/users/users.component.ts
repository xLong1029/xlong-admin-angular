import { Component, OnInit } from '@angular/core';

// 通过服务获取数据
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})

export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService
  ) { }

  // 初始化
  ngOnInit() {
    this.getUsers();
  }

  // 获取用户数据
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
    .subscribe(user => {
      this.users.push(user);
    });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
