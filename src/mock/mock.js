const Mock = require("mockjs");

module.exports = function() {
	// 配置 mock 响应的时间在 120ms ~~ 2s 之间
	Mock.setup({
		timeout: '120-2000'
	});
	// 拦截 /data/list 请求
	Mock.mock(/data\/list/, function() {
		let data = Mock.mock({
		  "rows|1-10": [
			{
			  "boolean|1": true,
			  "double|100-999.4": 1.0,
			  "float|1-100.2": 1.0,
			  "integer|1-999": 1,
			  "long|100-999999": 1,
			  "uuid|1-20": "@character",
			}
		  ]
		});
		return data.rows;
	});
	// 拦截 /data/save 请求
	Mock.mock(/data\/save/, function(request) {
		let body = request && request.body ? JSON.parse(request.body) : null;
		if(body) {
			console.log("提交的请求体内容:", body);
			let id = parseInt(body.id);
			if(id / 1 === id) {
				// 判断只要存在 id 字段就是成功
				return "success";
			}
		}
		return "failure";
	});
};