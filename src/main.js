// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'babel-polyfill'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import { Notification } from 'element-ui';
// import {}

import '../static/css/iconfont-aegis.css'
import dispatch from "./utils/dispatch";
import axios from './utils/axios-helper'
import ajax from './utils/ajax-helper'

Vue.use(ElementUI);
Vue.use(VueBlu);

Vue.prototype.$ajax = ajax;
Vue.prototype.$axios = axios;
Vue.prototype.$dispatch = dispatch;
Vue.prototype.$notify = Notification;
// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
