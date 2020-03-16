const FS = require("fs");
const PATH = require("path");
const Webpack = require("webpack");
const conf = require("./dev.conf");
const WebpackDevServer = require("webpack-dev-server");

process.stdout.write("webpack compile mode: [" + conf.mode + "] .\n\n");

// 创建 Webpack 的编译器
const compiler = Webpack(require('./dev.conf'));

// 开发模式下的配置
const devServerOptions = {
	open: true,
	hot: true,
	port: 7070,
	// https: true,
	compress: true,
	host: "localhost",
	historyApiFallback: {
		disableDotRule: true
	},
	overlay: {
		warnings: true,
		errors: true
	},
	watchOptions: {
		poll: 1000,
		watch: true,
		ignored: /node_modules/,
		watchContentBase: true
	}
};

const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(devServerOptions.port, "localhost", () => {
	console.log("starting server on http://localhost:" + devServerOptions.port);
});