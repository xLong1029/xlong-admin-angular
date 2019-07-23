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
          checked: false,
        },
        {
          id: 2,
          name: '网页设计',
          checked: false,
        },
        {
          id: 3,
          name: 'UI设计',
          checked: false,
        },
        {
          id: 4,
          name: 'WEB前端开发',
          checked: false,
        },
        {
          id: 5,
          name: '.NET开发',
          checked: false,
        },
        {
          id: 6,
          name: 'JAVA开发',
          checked: false,
        },
        {
          id: 7,
          name: 'PHP开发',
          checked: false,
        },
        {
          id: 8,
          name: '其他专业',
          checked: false,
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
