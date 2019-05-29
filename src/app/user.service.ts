import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

// import { USERS } from './mock-users';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = 'api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // 获取本地列表数据
  // getUsers(): Observable<User[]> {
  //   this.messageService.add('从服务端获取用户列表');
  //   return of(USERS);
  // }

  // 获取服务器数据
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('从服务端获取用户列表')),
        catchError(this.handleError<User[]>('用户列表获取失败', []))
      );
  }

  // 获取本地单个用户数据
  // getUser(id: number): Observable<User> {
  //   this.messageService.add(`从服务端获取编号为${id}的用户信息`);
  //   return of(USERS.find(user => user.id === id));
  // }

  // 获取服务器单个数据
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`从服务端获取编号为${id}的用户信息`)),
      catchError(this.handleError<User>(`编号为${id}的用户信息获取失败`))
    );
  }

  /** 找不到用户时返回信息 */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `提示` : `找不到`;
          this.log(`${outcome} 编号=${id} 的用户信息`);
        }),
        catchError(this.handleError<User>(`编号为${id}的用户信息获取失败`))
      );
  }

  /** POST: 新增一个用户 */
  addUser (hero: User): Observable<User> {
    return this.http.post<User>(this.userUrl, hero, httpOptions).pipe(
      tap((newUser: User) => this.log(`用户新增成功，添加编号为：${newUser.id}`)),
      catchError(this.handleError<User>('新增失败'))
    );
  }

  /** DELETE: 删除一个用户 */
  deleteUser (hero: User): Observable<User> {
    const id = hero.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`编号为${hero.id}的用户删除成功`)),
      catchError(this.handleError<User>('删除失败'))
    );
  }

  /** PUT: 更新一个用户 */
  updateUser (hero: User): Observable<any> {
    return this.http.put(this.userUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`编号为${hero.id}的用户信息更新成功`)),
      catchError(this.handleError<any>('更新失败'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add(`服务器提示: ${message}`);
  }
}
