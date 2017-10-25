import $ from 'jquery'
import Cookies from 'js-cookie'

function AjaxHelper() {
	this.ajax = function(url, type, dataType, data, callback) {
		$.ajax({
			url: url,
			type: type,
			dataType: dataType,
			data: data,

      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "JWT-MSC " + Cookies.get('token'));
      },

			success: callback,
			error: function(xhr, errorType, error) {
        if (xhr.status === 401 && xhr.statusText === "Unauthorized") {
          alert('登录已过期， 请重新登录');

          localStorage.removeItem('ms_username');
          window.location.href = '/';
        }
			}
		})
	}
}

AjaxHelper.prototype.get = function(url, data, callback) {
	this.ajax(url, 'GET', 'json', data, callback)
};

AjaxHelper.prototype.post = function(url, data, callback) {
	this.ajax(url, 'POST', 'json', data, callback)
};

AjaxHelper.prototype.put = function(url, data, callback) {
	this.ajax(url, 'PUT', 'json', data, callback)
};

AjaxHelper.prototype.delete = function(url, data, callback) {
	this.ajax(url, 'DELETE', 'json', data, callback)
};

AjaxHelper.prototype.jsonp = function(url, data, callback) {
	this.ajax(url, 'GET', 'jsonp', data, callback)
};

AjaxHelper.prototype.constructor = AjaxHelper;

export default new AjaxHelper();
