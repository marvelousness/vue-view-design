const Webpack = require("webpack");
const rimraf = require("rimraf");
const conf = require("./build.conf");
const timestamp = Date.now();

process.stdout.write("webpack compile mode: [" + conf.mode + "] .\n\n");

rimraf(conf.output.path, function() {
	Webpack(conf, function(err, stats) {
		if(err) {
			throw err;
		}

		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + "\n\n");

		process.stdout.write("Build complete, use " + (Date.now() - timestamp) + "ms.\n");
	});
});