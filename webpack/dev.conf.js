const PATH = require("path");
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = WebpackMerge(require("./conf"), {
	mode: "development",
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.vue$/i,
			loader: "vue-loader",
			options: {
				sourceMap: true,
				extract: false
			}
		}, {
			test: /\.js$/i,
			loader: "babel-loader",
			exclude: PATH.resolve(__dirname, "../node_modules"),
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
			loader: "url-loader"
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
			loader: "url-loader"
		}, {
			test: /\.css$/,
			use: ["vue-style-loader", "css-loader"]
		}, {
			test: /\.(sa|sc)ss$/,
			use: ["vue-style-loader", "css-loader", "stylus-loader"]
		}, {
			test: /\.less$/i,
			use: ["vue-style-loader", "css-loader", "less-loader"]
		}]
	},
	plugins: [
		new Webpack.NamedModulesPlugin(),
		new Webpack.HotModuleReplacementPlugin()
	]
});