import { MockRequest } from '@delon/mock';

export const ROUTES = {
  '/getMenus': (req: MockRequest) => {
    return {
      code: 200,
      msg: 'ok',
      data: [
        {
          text: '首页',
          link: '/home',
          group: false,
          icon: { type: 'icon', value: 'home', theme: 'fill' },
          hideInBreadcrumb: false,
        },
        {
          text: '组件示例',
          link: null,
          group: false,
          icon: { type: 'icon', value: 'appstore', theme: 'fill' },
          hideInBreadcrumb: false,
          children: [
            {
              text: '日出日落',
              link: '/example/sun',
              icon: { type: 'icon', value: 'home', theme: 'fill' },
              hideInBreadcrumb: false,
            },
          ],
        },
        {
          text: '用户管理',
          link: '/user-manage/list',
          group: false,
          icon: { type: 'icon', value: 'contacts', theme: 'fill' },
          hideInBreadcrumb: false,
        },
        {
          text: '个人中心',
          link: '/account/center',
          group: true,
          icon: null,
          hideInBreadcrumb: false,
        },
        {
          text: '修改密码',
          link: '/account/edit-password',
          group: true,
          icon: null,
          hideInBreadcrumb: false,
        },
      ],
    };
  },
};
