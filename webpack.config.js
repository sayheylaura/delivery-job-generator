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
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: [path.resolve(__dirname, './dist')],
		port: 3000
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
				test: /\.sass$/i,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.svg$/,
				include: path.resolve(__dirname, './src/assets/images/sprite'),
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFilename: 'assets/images/sprite.svg'
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
			favicon: path.resolve(__dirname, './public/favicon-32x32.png'),
			template: path.resolve(__dirname, './public/index.html')
		}),
		new SpriteLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.API_KEY': JSON.stringify(envVariables.API_KEY),
			'process.env.API_URL': JSON.stringify(envVariables.API_URL)
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
