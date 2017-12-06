import $ from 'jquery'
import Cookies from 'js-cookie'
import { Notification } from 'element-ui';

function AjaxHelper() {
	this.ajax = function(url, type, dataType, data, async=false, callback) {
		$.ajax({
			url: url,
			type: type,
			dataType: dataType,
      async:async,
			data: data,

      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "JWT-MSC " + Cookies.get('JWT-MSC'));
      },

			success: callback,
			error: function(xhr, errorType, error) {
			  console.log('ajax-helper:');
			  console.log(error);
        if (xhr.status === 401 && xhr.statusText === "Unauthorized") {
          alert('登录已过期， 请重新登录');

          localStorage.removeItem('ms_username');
          localStorage.removeItem('JWT-MSC');
          window.location.href = '/';
          window.location.reload(true);
        } else {
          Notification({
            message: error.toString(),
            type: 'error'
          });
        }
			}
		})
	}
}

AjaxHelper.prototype.get = function(url, data, async=false, callback) {
	this.ajax(url, 'GET', 'json', data, async, callback)
};

AjaxHelper.prototype.post = function(url, data, async, callback) {
	this.ajax(url, 'POST', 'json', data, async, callback)
};

AjaxHelper.prototype.put = function(url, data, async, callback) {
	this.ajax(url, 'PUT', 'json', data, async, callback)
};

AjaxHelper.prototype.delete = function(url, data, async, callback) {
	this.ajax(url, 'DELETE', 'json', data, async, callback)
};

AjaxHelper.prototype.jsonp = function(url, data, async, callback) {
	this.ajax(url, 'GET', 'jsonp', data, async, callback)
};

AjaxHelper.prototype.constructor = AjaxHelper;

export default new AjaxHelper();
