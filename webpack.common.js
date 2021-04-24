const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist'),
		assetModuleFilename: '[name][ext]',
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
				include: path.resolve(__dirname, './src/assets/images'),
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFileName: './assets/images/sprite.svg' // this is not working :( => https://github.com/JetBrains/svg-sprite-loader/issues/427
				}
			},
			{
				test: /\.(woff|woff2)$/i,
				include: path.resolve(__dirname, './src/assets/fonts'),
				loader: 'file-loader',
				options: {
					name: 'assets/fonts/[name][ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html')
		}),
		new SpriteLoaderPlugin()
	]
};
