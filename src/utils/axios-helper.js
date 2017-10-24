import axios from 'axios'
import Cookies from 'js-cookie'

import router from '../router'

/**
*  http request 拦截器，添加认证以供后台用户认证
 *  Reference: http://www.jb51.net/article/119692.htm
*/
axios.interceptors.request.use(
  config => {
    const token = Cookies.get('token');  //获取Cookie
    config.data = JSON.stringify(config.data);

    if (token) {
      config.headers = {
        // 'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
        'Authorization': 'JWT-MSC ' + token
      };
    }
    return config;
  },

  err => {
    return Promise.reject(err);
  }
);

/**
 *  http response 拦截器, 处理认证超时重新登录情况
 *  Reference: http://www.jb51.net/article/119692.htm
 */
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      alert('登录已过期， 请重新登录');
      router.push('/index');
      return false;
    }

    return Promise.reject(error.response.data)
  });

export default axios;