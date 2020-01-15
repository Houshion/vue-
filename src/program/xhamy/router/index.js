// import Vue from 'vue'
// import Router from 'vue-router'

import agent from './agent'
import user from './user'

// Vue.use(Router)

export default [
  ...user,
  ...agent,
  {
    path: '/scan',
    name: 'scan',
    component: () => import('~xh/views/scan.vue'),
    meta: {
      title: '二维码',
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('~xh/views/error.vue'),
    meta: {
      title: '设备异常',
    }
  },
  {
    path: '/shopTest',
    name: 'shopTest',
    component: () => import('~xh/views/shopTest.vue'),
    meta: {
      title: '商城',
    }
  },
  {
    path: "*",
    redirect: "/"
  },
]

// export default new Router({
//   routes: [
//     ...user,
//     ...agent,
//     {
//       path: '/scan',
//       name: 'scan',
//       component: () => import('~xh/views/scan.vue'),
//       meta: {
//         title: '二维码',
//       }
//     },
//     {
//       path: '/error',
//       name: 'error',
//       component: () => import('~xh/views/error.vue'),
//       meta: {
//         title: '设备异常',
//       }
//     },
//     {
//       path: '/shopTest',
//       name: 'shopTest',
//       component: () => import('~xh/views/shopTest.vue'),
//       meta: {
//         title: '商城',
//       }
//     },
//     {
//       path: "*",
//       redirect: "/"
//     },
//   ]
// })