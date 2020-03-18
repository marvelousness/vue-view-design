const PATH = require("path");
const rimraf = require("rimraf");

// 测试删除 target
rimraf(PATH.resolve(__dirname, "../target"), function() {
	console.log("target is deleted!");
});