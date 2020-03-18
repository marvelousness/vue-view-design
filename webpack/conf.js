const PATH = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 解析物理地址
 */
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
			api: resolve("src/api"),
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
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: resolve("index.html"),
			inject: true
		})
	]
};