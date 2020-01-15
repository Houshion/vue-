export default [{
    path: '/login',
    name: 'login',
    component: () => import('~snf/views/login'),
    meta: {
      title: '手机绑定',
      wechatAuth: true,
    }
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('~snf/views/login/agreement'),
    meta: {
      title: '附近网点',
      wechatAuth: true,
    }
  },
  {
    path: '/',
    name: 'index',
    component: () => import('~snf/views/indexMap'),
    meta: {
      title: '附近网点',
      wechatAuth: true,
    }
  },
  {
    path: '/mapList',
    name: 'mapList',
    component: () => import('~snf/views/indexMap/list'),
    meta: {
      title: '附近网点',
      wechatAuth: true,
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('~snf/views/indexMap/booking'),
    meta: {
      title: '预约',
      wechatAuth: true,
    }
  },
  {
    path: '/confirmStatus',
    name: 'confirmStatus',
    component: () => import('~snf/views/status/confirm'),
    meta: {
      title: '确认订单',
      wechatAuth: true,
    }
  },
  {
    path: '/setMealStatus',
    name: 'setMealStatus',
    component: () => import('~snf/views/status/setMeal'),
    meta: {
      title: '购买套餐',
      wechatAuth: true,
    }
  },
  // 商城
  {
    path: '/shop',
    name: 'shop',
    component: () => import('~snf/views/shop'),
    meta: {
      title: '商城',
      wechatAuth: true,
    }
  },
  {
    path: '/shopDetail',
    name: 'shopDetail',
    component: () => import('~snf/views/shop/shopDetail'),
    meta: {
      title: '商品详情',
      wechatAuth: true,
    }
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import('~snf/views/shop/confirmOrder'),
    meta: {
      title: '确认订单',
      wechatAuth: true,
    }
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('~snf/views/shop/address'),
    meta: {
      title: '地址管理',
      wechatAuth: true,
    }
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: () => import('~snf/views/shop/addressEdit'),
    meta: {
      title: '地址管理',
      wechatAuth: true,
    }
  },
  // 个人中心
  {
    path: '/personCenter',
    name: 'personCenter',
    component: () => import('~snf/views/personCenter'),
    meta: {
      title: '个人中心',
      wechatAuth: true,
    }
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('~snf/views/personCenter/information'),
    meta: {
      title: '个人资料',
      wechatAuth: true,
    }
  },
  {
    path: '/changeMobile',
    name: 'changeMobile',
    component: () => import('~snf/views/personCenter/changeMobile'),
    meta: {
      title: '修改手机',
      wechatAuth: true,
    }
  },
  {
    path: '/myBooking',
    name: 'myBooking',
    component: () => import('~snf/views/personCenter/myBooking'),
    meta: {
      title: '我的预约',
      wechatAuth: true,
    }
  },
  // 我的订单
  {
    path: '/orderIndex',
    name: 'orderIndex',
    component: () => import('~snf/views/personCenter/order'),
    meta: {
      title: '我的订单',
      wechatAuth: true,
    }
  },
  {
    path: '/regularOrders',
    name: 'regularOrders',
    component: () => import('~snf/views/personCenter/order/regularOrders'),
    meta: {
      title: '普通订单',
      wechatAuth: true,
    }
  },
  {
    path: '/regularOrdersDetail',
    name: 'regularOrdersDetail',
    component: () => import('~snf/views/personCenter/order/regularOrdersDetail'),
    meta: {
      title: '订单详情',
      wechatAuth: true,
    }
  },
  {
    path: '/exception',
    name: 'exception',
    component: () => import('~snf/views/personCenter/order/exception'),
    meta: {
      title: '异常上报',
      wechatAuth: true,
    }
  },
  {
    path: '/packageOrder',
    name: 'packageOrder',
    component: () => import('~snf/views/personCenter/order/packageOrder'),
    meta: {
      title: '套餐订单',
      wechatAuth: true,
    }
  },
  {
    path: '/packageOrderDetail',
    name: 'packageOrderDetail',
    component: () => import('~snf/views/personCenter/order/packageOrderDetail'),
    meta: {
      title: '订单详情',
      wechatAuth: true,
    }
  },
  {
    path: '/shopOrder',
    name: 'shopOrder',
    component: () => import('~snf/views/personCenter/order/shopOrder'),
    meta: {
      title: '商城订单',
      wechatAuth: true,
    }
  },
  {
    path: '/shopOrderDetail',
    name: 'shopOrderDetail',
    component: () => import('~snf/views/personCenter/order/shopOrderDetail'),
    meta: {
      title: '订单详情',
      wechatAuth: true,
    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('~snf/views/personCenter/wallet'),
    meta: {
      title: '我的钱包',
      wechatAuth: true,
    }
  },
  {
    path: '/myPackage',
    name: 'myPackage',
    component: () => import('~snf/views/personCenter/wallet/myPackage'),
    meta: {
      title: '我的套餐',
      wechatAuth: true,
    }
  },
  {
    path: '/myCoupon',
    name: 'myCoupon',
    component: () => import('~snf/views/personCenter/wallet/myCoupon'),
    meta: {
      title: '我的体验券',
      wechatAuth: true,
    }
  },
  {
    path: '/getCoupon',
    name: 'getCoupon',
    component: () => import('~snf/views/personCenter/wallet/getCoupon'),
    meta: {
      title: '领取体验券',
      wechatAuth: false,
    }
  },
  {
    path: '/walletDetail',
    name: 'walletDetail',
    component: () => import('~snf/views/personCenter/wallet/detail'),
    meta: {
      title: '明细',
      wechatAuth: true,
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('~snf/views/personCenter/feedback'),
    meta: {
      title: '意见反馈',
      wechatAuth: true,
    }
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('~snf/views/personCenter/guide'),
    meta: {
      title: '用户指南',
      wechatAuth: true,
    }
  },
  {
    path: '/guideDetail',
    name: 'guideDetail',
    component: () => import('~snf/views/personCenter/guide/guideDetail'),
    meta: {
      title: '用户指南',
      wechatAuth: true,
    }
  },
  {
    path: '/guideDetail',
    name: 'guideDetail',
    component: () => import('~snf/views/personCenter/guide/guideDetail'),
    meta: {
      title: '用户指南',
      wechatAuth: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('~snf/views/personCenter/about'),
    meta: {
      title: '关于我们',
      wechatAuth: true,
    }
  },

  {
    path: "*",
    redirect: "/"
  },
]