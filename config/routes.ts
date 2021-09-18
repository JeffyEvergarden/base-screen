export default [
  {
    path: '/',
    layout: false,
    name: '基础大屏',
    component: './screen/base-screen',
  },
  {
    path: '/screen',
    layout: false,
    name: '基础大屏',
    component: './screen/base-screen',
  },
  {
    path: '/editor',
    layout: false,
    name: '编辑',
    component: './TestEditor',
  },
  {
    path: '/chinamap',
    layout: false,
    name: '中国地图测试',
    component: './ChinaMap',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin', // 权限
    component: './Admin', // 相对page目录下
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/screen' },
  { component: './404' },
];
