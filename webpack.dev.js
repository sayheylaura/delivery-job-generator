const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		watchContentBase: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.sass$/i,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
});
