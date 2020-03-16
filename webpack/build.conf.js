const OS = require("os");
const PATH = require("path");
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(pathname) {
	return PATH.resolve(__dirname, "../" + pathname);
}

module.exports = WebpackMerge(require("./conf"), {
	output: {
		path: resolve("target/"),
		filename: "statics/js/[name].js",
		publicPath: "/"
	},
	mode: "production",
	parallelism: 10,
	target: "web",
	devtool: false,
	profile: true,
	bail: true,
	module: {
		rules: [{
			test: /\.vue$/i,
			loader: "vue-loader",
			options: {
				sourceMap: false,
				extract: true
			}
		}, {
			test: /\.js$/i,
			exclude: resolve("node_modules"),
			use: ["thread-loader", "babel-loader"]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
			use: [{
				loader: "url-loader",
				options: {
					name: "[name].[ext]",
					// 当图片大于1k时，交给file-loader处理，
					// 否则url-loader会把图片src转成base64编码
					limit: 1000,
					publicPath: "/statics/images/",
					outputPath: "/statics/images"
				}
			}]
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
			loader: "url-loader"
		}, {
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: false
					}
				},
				"css-loader"
			]
		}, {
			test: /\.(sa|sc)ss$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: false
					}
				},
				"css-loader",
				"postcss-loader",
				"sass-loader"
			]
		}, {
			test: /\.less$/i,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: false
					}
				},
				"css-loader",
				"postcss-loader",
				"less-loader"
			]
		}]
	},
	performance: {
		// 最大限制值：1.5MB（以字节为单位）
		maxAssetSize: 1572864,
		// 最大入口限制值：5MB（以字节为单位）
		maxEntrypointSize: 5242880,
		hints: "warning",
		assetFilter(name) {
			// 提供资源文件名的断言函数
			return name.endsWith('.css') || name.endsWith('.js');
		}
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: OS.cpus().length
			}),
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				// cssProcessorOptions: cssnanoOptions,
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true,
						},
						normalizeUnicode: false
					}]
				},
				canPrint: true
			})
		],
		splitChunks: {
			chunks: "all",
			// 模块的最小体积
			// maxSize: 1048576,
			// 模块的最小被引用次数
			minChunks: 1,
			// 按需加载的最大并行请求数
			maxAsyncRequests: 8,
			// 一个入口最大并行请求数
			maxInitialRequests: 6,
			// 文件名的连接符
			// automaticNameDelimiter: "-",
			// name: true,
			// 缓存组
			cacheGroups: {
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					minChunks: 1,
					priority: -1,
					enforce: true
				},
				default: {
					name: "app",
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "statics/css/[name].css",
			chunkFilename: "statics/css/[name].css",
			ignoreOrder: false
		}),
		//		new CompressionWebpackPlugin({
		//			test: /\.(js|css)$/i,
		//			algorithm: "gzip",
		//			threshold: 10240,
		//			minRatio: 0.8
		//		}),
		//		new BundleAnalyzerPlugin()
	]
});