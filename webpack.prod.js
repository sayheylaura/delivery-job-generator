const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimize: true,
		minimizer: [`...`, new CssMinimizerPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.sass$/i,
				exclude: /(node_modules)/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [new MiniCssExtractPlugin()]
});
