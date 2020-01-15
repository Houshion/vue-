export default [{
        path: '/',
        name: 'indexMap',
        component: () => import('~xh/views/userSide/map'),
        meta: {
            title: '共享按摩椅',
        }
    },
    {
        path: '/booking',
        name: 'booking',
        component: () => import('~xh/views/userSide/booking'),
        meta: {
            title: '预约设备',
        }
    },
    {
        path: '/chooseTc',
        name: 'chooseTc',
        component: () => import('~xh/views/userSide/chooseTc'),
        meta: {
            title: '选择套餐',
        }
    },
    {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: () => import('~xh/views/userSide/confirmOrder'),
        meta: {
            title: '确认订单',
        }
    },
    {
        path: '/useComment',
        name: 'useComment',
        component: () => import('~xh/views/userSide/useComment'),
        meta: {
            title: '使用说明',
        }
    },
    {
        path: '/chooseType',
        name: 'chooseType',
        component: () => import('~xh/views/userSide/chooseType'),
        meta: {
            title: '选择按摩类型',
        }
    },
    {
        path: '/coupon',
        name: 'coupon',
        component: () => import('~xh/views/userSide/coupon'),
        meta: {
            title: '优惠券',
        }
    },
    {
        path: '/centerInfo',
        name: 'centerInfo',
        component: () => import('~xh/views/userSide/centerInfo'),
        meta: {
            title: '个人中心',
        }
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: () => import('~xh/views/userSide/orderList'),
        meta: {
            title: '订单列表',
        }
    },
    {
        path: '/orderList/detail',
        name: 'orderList/detail',
        component: () => import('~xh/views/userSide/orderList/detail.vue'),
        meta: {
            title: '订单列表',
        }
    },
    {
        path: '/aboutUs',
        name: 'aboutUs',
        component: () => import('~xh/views/userSide/aboutUs'),
        meta: {
            title: '关于我们',
        }
    },
    {
        path: '/infomation',
        name: 'infomation',
        component: () => import('~xh/views/userSide/infomation'),
        meta: {
            title: '消息',
        }
    },
    {
        path: '/infomationDetail',
        name: 'infomationDetail',
        component: () => import('~xh/views/userSide/infomation/detail.vue'),
        meta: {
            title: '消息详情',
        }
    },
    {
        path: '/qrCode',
        name: 'qrCode',
        component: () => import('~xh/views/userSide/qrCode'),
        meta: {
            title: '公众号二维码',
        }
    },
    {
        path: '/using',
        name: 'using',
        component: () => import('~xh/views/userSide/using'),
        meta: {
            title: '使用中',
        }
    },
    {
        path: '/reporting',
        name: 'reporting',
        component: () => import('~xh/views/userSide/reporting'),
        meta: {
            title: '我要报障',
        }
    },
    {
        path: '/bookingOrder',
        name: 'bookingOrder',
        component: () => import('~xh/views/userSide/bookingOrder'),
        meta: {
            title: '预约订单',
        }
    },
    {
        path: '/moneyPakage',
        name: 'moneyPakage',
        component: () => import('~xh/views/userSide/moneyPakage'),
        meta: {
            title: '我的钱包',
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: () => import('~xh/views/userSide/moneyPakage/recharge.vue'),
        meta: {
            title: '充值',
        }
    },
]