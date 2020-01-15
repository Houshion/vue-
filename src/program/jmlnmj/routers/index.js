export default [{
    path: '/',
    name: 'login',
    component: () => import('~jmlnmj/views/login'),
    meta: {
      title: '登录',
      wechatAuth: true,
    }
  },
  {
    path: '/operation',
    name: 'operation',
    component: () => import('~jmlnmj/views/operation'),
    meta: {
      title: '运维',
    }
  },
  {
    path: '/agency',
    name: 'agency',
    component: () => import('~jmlnmj/views/agency'),
    meta: {
      title: '商户',
    }
  },
  /* 设备管理 */
  {
    path: '/device',
    name: 'device',
    component: () => import('~jmlnmj/views/device'),
    meta: {
      title: '设备管理',
    }
  },
  {
    path: '/deviceDetail',
    name: 'deviceDetail',
    component: () => import('~jmlnmj/views/device/detail'),
    meta: {
      title: '设备管理',
    }
  },
  {
    path: '/deviceReload',
    name: 'deviceReload',
    component: () => import('~jmlnmj/views/device/reload'),
    meta: {
      title: '设备管理',
    }
  },
  /* 消息管理 */
  {
    path: '/message',
    name: 'message',
    component: () => import('~jmlnmj/views/message'),
    meta: {
      title: '消息管理',
    }
  },
  /* 收入统计 */
  {
    path: '/count',
    name: 'count',
    component: () => import('~jmlnmj/views/count'),
    meta: {
      title: '收入统计',
    }
  },
  {
    path: '/countDetail',
    name: 'countDetail',
    component: () => import('~jmlnmj/views/count/detail'),
    meta: {
      title: '收入统计',
    }
  },
  /* 订单管理 */
  {
    path: '/order',
    name: 'order',
    component: () => import('~jmlnmj/views/order'),
    meta: {
      title: '订单管理',
    }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('~jmlnmj/views/order/detail'),
    meta: {
      title: '详情',
    }
  },
  {
    path: "*",
    redirect: "/"
  },
]