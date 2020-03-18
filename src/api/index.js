import axios from "axios";
import qs from "qs";

/**
 * 统一异步请求处理器
 * @param {String} _url 请求的地址
 * @param {String} _method 请求的方法
 * @param {Object || Array} _params 请求的参数
 * @param {String} type 请求的参数
 */
function request(_url, _method, _params, _type) {
	_method = _method || "GET";
	_params = _params || {};
	_type = _type || "QueryString";
	if(!_url) {
		return new Promise(function(resolve, reject) {
			reject("Unable to parse the address of the request");
		});
	}
	var config = {
		headers: {
			"X-Requested-With": "XMLHttpRequest"
		},
		method: _method,
		url: _url,
		withCredentials: true
	};
	
	if(_method.toUpperCase() == "PUT" || _method.toUpperCase() == "POST" || _method.toUpperCase() == "PATCH") {
		if(_type.toUpperCase() == "FORMDATA") {
			// `transformRequest` 允许在向服务器发送前，修改请求数据，
			// 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
			// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
			// 如果传递 type 值为 FormData，则认为需要进行表单提交
			// 如果请求方式为 POST 则处理为 表单提交
			config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
			config.transformRequest = [function(data) {
				return qs.stringify(_params);
			}];
		} else {
			config.data = _params;
		}
	} else if(_method.toUpperCase() == "DELETE") {
		// 如果请求方式为 DELETE 则处理为 表单提交
		config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
		config.transformRequest = [function(data) {
			return qs.stringify(_params);
		}];
	} else {
		config.params = _params;
	}
	return axios(config);
}

export default {
	getDataList(_params) {
		return request("/data/list", "GET", _params, "QueryString");
	},
	postData(_params) {
		return request("/data/save", "POST", _params, "RequestPayload");
	}
};