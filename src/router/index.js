import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },

    {
      path: '/register',
      component: resolve => require(['../components/page/Regiter.vue'], resolve)
    },

    {
      path: '/forget-password',
      component: resolve => require(['../components/page/ForgetPasswod.vue'], resolve)
    },

    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/index',
          component: resolve => require(['../components/page/Index.vue'], resolve)
        },

        {
          path: '/spider-create',
          component: resolve => require(['../components/page/SpiderCreate.vue'], resolve)
        },

        {
          path: '/spider-list',
          component: resolve => require(['../components/page/SpiderList.vue'], resolve)
        },

        {
          path: '/order',
          component: resolve => require(['../components/page/MyOrder.vue'], resolve)
        },

        {
          path: '/price',
          component: resolve => require(['../components/page/Price.vue'], resolve)
        },

        {
          path: '/data-market',
          component: resolve => require(['../components/page/DataMarket.vue'], resolve)
        },


        {
          path: '/blog',
          component: resolve => require(['../components/page/Blog.vue'], resolve)
        },

        {
          path: '/faq',
          component: resolve => require(['../components/page/FAQ.vue'], resolve)
        },

        {
          path: '/tutorial',
          component: resolve => require(['../components/page/Tutorial.vue'], resolve)
        },

        {
          path: '/spider-configure',
          component: resolve => require(['../components/page/SpiderConfigure.vue'], resolve)
        },

        {
          path: '/spider-log',
          component: resolve => require(['../components/page/SpiderLog.vue'], resolve)
        },

        {
          path: '/spider-data',
          component: resolve => require(['../components/page/SpiderData.vue'], resolve)
        },

        {
          path: '/spider-rules',
          component: resolve => require(['../components/page/SpiderRules.vue'], resolve)
        },

        {
          path: '/edit-spider-data/:task_uid/:id',
          component: resolve => require(['../components/page/SpiderDataEdit.vue'], resolve)
        },

      ]
    }

  ]
})
