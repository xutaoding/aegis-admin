
/**
*  获取cookie
*/
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

/**
 *  设置cookie, 增加到vue实例方便全局调用
 */
export function setCookie (c_key, c_value) {
  document.cookie = c_key + "=" + c_value;
}


