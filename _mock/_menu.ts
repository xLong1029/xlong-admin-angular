import { MockRequest } from '@delon/mock';

// 菜单列表
const menuList = [
  {
    // 角色权限
    role: ['admin', 'manage', 'user'],
    text: '首页',
    link: '/home',
    group: false,
    icon: { type: 'icon', value: 'home', theme: 'fill' },
    hideInBreadcrumb: false,
    hideBreadcrumb: false,
  },
  {
    text: '组件示例',
    link: null,
    group: false,
    icon: { type: 'icon', value: 'appstore', theme: 'fill' },
    hideInBreadcrumb: false,
    hideBreadcrumb: false,
    children: [
      {
        role: ['admin', 'manage', 'user'],
        text: '日出日落效果',
        link: '/example/sun',
        hideInBreadcrumb: false,
        hideBreadcrumb: false,
      },
      {
        role: ['admin', 'manage', 'user'],
        text: '自定义图表组件',
        link: '/example/chart',
        hideInBreadcrumb: false,
        hideBreadcrumb: false,
      },
    ],
  },
  {
    role: ['admin', 'manage', 'user'],
    text: 'GIS地图示例',
    link: '/map/gis-map',
    group: false,
    icon: { type: 'icon', value: 'environment', theme: 'fill' },
    hideInBreadcrumb: false,
    hideBreadcrumb: true
  },
  {
    role: ['admin', 'manage'],
    text: '用户管理',
    link: '/user-manage/list',
    group: false,
    icon: { type: 'icon', value: 'contacts', theme: 'fill' },
    // 用户操作权限
    // button: ['User_Add', 'User_Edit', 'User_Delete', 'User_Control'],
    hideInBreadcrumb: false,
    hideBreadcrumb: false,
  },
  {
    role: ['admin', 'manage', 'user'],
    text: '个人中心',
    link: '/account/center',
    group: true,
    icon: null,
    hideInBreadcrumb: false,
    hideBreadcrumb: false,
  },
  {
    role: ['admin', 'manage', 'user'],
    text: '修改密码',
    link: '/account/edit-password',
    group: true,
    icon: null,
    hideInBreadcrumb: false,
    hideBreadcrumb: false,
  },
];

// 获取权限菜单
function getAclMenu(role: any) {

  let list: any = [];

  menuList.forEach(m =>{
    let menu: any = [];
    let submenu: any = [];

    if(m.children){
      menu = m;

      m.children.forEach(sm => {
        if(sm.role.indexOf(role) !== -1){
          submenu.push(sm);
        }
      });

      menu.children = submenu;
    }
    else{
      if(m.role.indexOf(role) !== -1){
        menu = m;
      }
    }

    list.push(menu);

  });

  return { code: 200, msg: 'ok', data: list };
}

export const ROUTES = {
  '/getMenus/:role': (req: MockRequest) => getAclMenu(req.params.role),
};
