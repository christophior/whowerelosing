var HtmlWebpackPlugin = require('html-webpack-plugin'),
	HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
		template: __dirname + '/app/index.html',
		filename: 'index.html',
		inject: 'body'
	})

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: "index_bundle.js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.json$/, loader: 'json'},
			{test: /\.css$/, loader: "style-loader!css-loader"},
			{ test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
			{ test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' }
		],
		rules: [
			{test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	resolve: {
		modulesDirectories: ['node_modules']
	}
}