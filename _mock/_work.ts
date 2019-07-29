import { MockRequest } from '@delon/mock';

export const WORK = {
  // 专业
  '/getProfession': (req: MockRequest) => {
    return {
      code: 200,
      msg: 'ok',
      data: [
        {
          id: 1,
          name: '建筑设计',
        },
        {
          id: 2,
          name: '网页设计',
        },
        {
          id: 3,
          name: 'UI设计',
        },
        {
          id: 4,
          name: 'WEB前端开发',
        },
        {
          id: 5,
          name: '.NET开发',
        },
        {
          id: 6,
          name: 'JAVA开发',
        },
        {
          id: 7,
          name: 'PHP开发',
        },
        {
          id: 8,
          name: '其他专业',
        },
      ],
    };
  },
  // 职位
  '/getJob': (req: MockRequest) => {
    return {
      code: 200,
      msg: 'ok',
      data: [
        {
          id: 1,
          name: '管理',
        },
        {
          id: 2,
          name: '设计',
        },
        {
          id: 3,
          name: '开发',
        },
        {
          id: 8,
          name: '其他',
        },
      ],
    };
  },
};
