if(window && window.location && window.location.port == 7070) {
	// 判断当前端口是 7070 则执行 mock
	require("./mock")();
}