import axios from 'axios'
import Cookies from 'js-cookie'
import { Notification } from 'element-ui';

/**
*  http request 拦截器，添加认证以供后台用户认证
 *  Reference: http://www.jb51.net/article/119692.htm
*/
axios.interceptors.request.use(
  config => {
    const token = Cookies.get('JWT-MSC');  //获取Cookie
    config.data = JSON.stringify(config.data);
    console.log('auth token:');
    console.log(token);

    if (token) {
      config.headers = {
        // 'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
        'Content-Type': 'application/json',
        'Authorization': 'JWT-MSC ' + token
      };
    } else {
      config.headers = {
        'Content-Type': 'application/json'
      }
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
    try {
      error.response.status
    } catch (err) {
      Notification({message: error.toString(), type: 'error'});
      return error;
    }

    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      alert('登录已过期， 请重新登录');

      localStorage.removeItem('ms_username');
      localStorage.removeItem('JWT-MSC');
      window.location.href = '/';
      return false;
    } else {
      console.log('axios-helper response error');
      // Notification({message: error.toString(), type: 'error'});
    }

    return Promise.reject(error.response.data)
  });

export default axios;
