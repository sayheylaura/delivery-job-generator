const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const envVariables = dotenv.config().parsed;

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			},
			{
				test: /\.svg$/,
				include: path.resolve(__dirname, './src/assets/images/sprite'),
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFileName: './assets/images/sprite.svg' // this is not working :( => https://github.com/JetBrains/svg-sprite-loader/issues/427
				}
			},
			{
				test: /\.svg$/,
				include: path.resolve(__dirname, './src/assets/images'),
				exclude: path.resolve(__dirname, './src/assets/images/sprite'),
				loader: 'file-loader',
				options: {
					name: 'assets/images/[name].[ext]'
				}
			},
			{
				test: /\.(woff|woff2)$/,
				include: path.resolve(__dirname, './src/assets/fonts'),
				loader: 'file-loader',
				options: {
					name: 'assets/fonts/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
			favicon: path.resolve(__dirname, './public/favicon-32x32.png')
		}),
		new SpriteLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.API_KEY': JSON.stringify(envVariables.API_KEY),
			'process.env.API_URL': JSON.stringify(envVariables.API_URL)
		})
	]
};
