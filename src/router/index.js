import Vue from 'vue'
import Router from 'vue-router'

// import testRouter from '~test/router'
import xhamyRouter from '~xh/router'
// import zhenzhiRouter from "~sz/router"
// import chychy from "~chy/routers"
import snf from "~snf/routers"
import nmj from "~nmj/routers"
import jmlnmj from "~jmlnmj/routers"


Vue.use(Router)

export default new Router({
  routes: [
    // ...testRouter, // 测试项目路由
    // ...xhamyRouter, // 鑫海按摩椅路由
    // ...zhenzhiRouter, // 森值售货柜路由
    // ...chychy, // 车海洋洗车机路由
    // ...snf, // 光健桑拿房路由
    // ...nmj, // 四川碾米机路由
    ...jmlnmj, // 吉明亮碾米机路由
  ]
})