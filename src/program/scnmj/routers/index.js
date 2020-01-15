export default [{
    path: '/',
    name: 'index',
    component: () => import('~nmj/views/indexMap'),
    meta: {
      title: '附近网点',
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('~nmj/views/feedback'),
    meta: {
      title: '您的体验反馈',
    }
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import('~nmj/views/introduce'),
    meta: {
      title: '项目介绍',
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('~nmj/views/about'),
    meta: {
      title: '公司介绍',
    }
  },
  {
    path: '/binding',
    name: 'binding',
    component: () => import('~nmj/views/binding'),
    meta: {
      title: '商家绑定',
      wechatAuth: true,
    }
  },

  {
    path: "*",
    redirect: "/"
  },
]