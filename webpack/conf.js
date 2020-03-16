const PATH = require("path");

function resolve(pathname) {
	return PATH.resolve(__dirname, "../" + pathname);
}

/**
 * 公共配置
 */
module.exports = {
	entry: {
		app: resolve("src/main.js")
	},
	resolve: {
		extensions: [".js", ".vue", ".less", ".json"],
		modules: [
			resolve("src"),
			resolve("node_modules")
		],
		alias: {
			src: resolve("src/"),
			statics: resolve("src/assets/"),
			vue: resolve("node_modules/vue/dist/vue.js")
		}
	},
	resolve: {
		extensions: [".js", ".vue", ".less", ".json"],
		modules: [
			resolve("src"),
			resolve("node_modules")
		],
		alias: {
			src: resolve("src/"),
			statics: resolve("src/assets/"),
			vue: resolve("node_modules/vue/dist/vue.js")
		}
	}
};