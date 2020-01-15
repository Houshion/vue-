export default [{
    path: '/',
    name: 'index',
    component: () => import('~chy/views/indexMap'),
    meta: {
      title: '附近网点',
      wechatAuth: true,
    }
  },
  {
    path: '/mapList',
    name: 'mapList',
    component: () => import('~chy/views/indexMap/list'),
    meta: {
      title: '附近网点',
      wechatAuth: true,
    }
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('~chy/views/guide'),
    meta: {
      title: '操作指南',
      wechatAuth: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~chy/views/login'),
    meta: {
      title: '用户登录',
      wechatAuth: true,
    }
  },
  {
    path: "*",
    redirect: "/"
  },
]