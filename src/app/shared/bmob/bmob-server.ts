/*
 * 功能 : 封装bmob的增删改查数据方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-7-22
 * 版本 : version 2.1
 */

import { ObjOmit } from './../utils/objOmit';
import { APPLICATION_ID, REST_API_KEY } from './../../app.global';

export default {
  // 初始化
  Init: () => {
    // Bmob.initialize("Application ID", "REST API Key");
    Bmob.initialize(APPLICATION_ID, REST_API_KEY);
  },
  // 获取查询数据对象
  GetQuery: (tableName: any) => {
    // 创建查询对象，入口参数是对象类的实例
    return Bmob.Query(tableName);
  },
  // 获取列表数据
  GetListData: (query: any, pageNo: any, pageSize: any) => {
    return new Promise((resolve, reject) => {
      if (pageNo && pageSize) {
        // 统计满足query的结果集记录条数
        query.count().then((result: any) => {
          // console.log(`共有${result}条记录`);
          const page = {
            page: pageNo,
            pageSize,
            total: result,
            pages: Math.ceil(result / pageSize),
          };

          // 对createdAt字段降序排列
          query.order('-createdAt');
          // 返回数据条数，默认返回10条数据
          query.limit(pageSize);
          // 跳过前面几条数据开始
          query.skip((pageNo - 1) * pageSize);

          query
            .find()
            .then((res: any) => resolve({ code: 200, data: res, page }))
            .catch((err: any) => reject(err));
        });
      } else {
        query
          .find()
          .then((res: any) => resolve({ code: 200, data: res }))
          .catch((err: any) => reject(err));
      }
    });
  },
  // 查找一行数据
  FindOneData: (query: any) => {
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((res: any) => resolve({ code: 200, data: res[0] }))
        .catch((err: any) => reject(err));
    });
  },
  // 获取一行数据
  GetOne: (tableName: any, objectId: any) => {
    const query = Bmob.Query(tableName);
    return new Promise((resolve, reject) => {
      query
        .get(objectId)
        .then((res: any) => resolve({ code: 200, data: res }))
        .catch((err: any) => reject(err));
    });
  },
  // 添加一行数据
  AddOne: (tableName: any, params: { [x: string]: any }) => {
    const query = Bmob.Query(tableName);
    return new Promise((resolve, reject) => {
      // 循环执行set操作
      // tslint:disable-next-line: forin
      for (const i in params) {
        query.set(i, params[i]);
      }
      query
        .save()
        .then(() => resolve({ code: 200, msg: '操作成功！' }))
        .catch((err: any) => reject(err));
    });
  },
  // 删除一行数据
  DelOne: (tableName: any, objectId: any) => {
    const query = Bmob.Query(tableName);
    // 获取对象并删除
    return new Promise((resolve, reject) => {
      query
        .get(objectId)
        .then((res: any) => {
          res
            .destroy()
            .then(() => resolve({ code: 200, msg: '操作成功！' }))
            .catch((err: any) => reject(err));
        })
        .catch(() => console.log('无法通过该objectId获取数据'));
    });
  },
  // 修改一行数据
  EditOne: (tableName: any, objectId: any, params: { [x: string]: any }) => {
    const query = Bmob.Query(tableName);
    // 删除参数中的objectId值
    ObjOmit(params, ['objectId', 'createdAt', 'updatedAt']);
    // 获取对象并修改
    return new Promise((resolve, reject) => {
      query
        .get(objectId)
        .then(res => {
          // 循环执行set操作
          // tslint:disable-next-line: forin
          for (const i in params) {
            res.set(i, params[i]);
          }
          res
            .save()
            .then(() => resolve({ code: 200, msg: '操作成功！' }))
            .catch((err: any) => reject(err));
        })
        .catch(() => resolve({ code: 404, msg: '对象不存在！' }));
    });
  },
  // 批量删除数据
  DelMore: (tableName: any, objectIds: any) => {
    const query = Bmob.Query(tableName);
    // 查询某一字段值在某一集合中的记录
    query.containedIn('objectId', objectIds);
    // 获取对象并删除
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((todos: any) => {
          todos
            .destroyAll()
            .then(() => resolve({ code: 200, msg: '操作成功！' }))
            .catch((err: any) => reject(err));
        })
        .catch(() => resolve({ code: 404, msg: '对象不存在！' }));
    });
  },
  // 批量修改数据
  EditMore: (tableName: any, objectIds: any, params: { [x: string]: any }) => {
    const query = Bmob.Query(tableName);
    query.containedIn('objectId', objectIds);
    // 获取对象并修改
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((todos: any) => {
          // 循环执行set操作
          // tslint:disable-next-line: forin
          for (const i in params) {
            todos.set(i, params[i]);
          }
          todos
            .saveAll()
            .then(() => resolve({ code: 200, msg: '操作成功！' }))
            .catch((err: any) => reject(err));
        })
        .catch(() => resolve({ code: 404, msg: '对象不存在！' }));
    });
  },
};
