const PATH = require("path");
const rimraf = require("rimraf");

rimraf(PATH.resolve(__dirname, "../target"), function() {
	console.log("已删除目录");
});