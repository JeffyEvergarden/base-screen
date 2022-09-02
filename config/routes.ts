export default [
  {
    path: '/',
    hideInMenu: true,
    layout: false,
    name: '基础业务量大屏',
    component: './screen/base-screen',
  },
  {
    path: '/detail',
    hideInMenu: true,
    layout: false,
    name: '分渠道业务量大屏',
    component: './screen/detail-screen',
  },
  {
    path: '/demo',
    hideInMenu: true,
    layout: false,
    name: 'DEMO',
    component: './demo',
  },
  { path: '/403', component: './403', layout: true, noAuth: true },
  { component: './404', layout: false },
];
