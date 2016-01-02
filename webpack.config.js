var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src', 'game.js'),
	output: {
		filename: 'snake.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '',
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				loader: 'eslint?{fix:true}'
			}
		],
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
}