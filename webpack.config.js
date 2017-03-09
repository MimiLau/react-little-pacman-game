// webpack.config.js
// const webpack = window.require('webpack');

module.exports = {
	postLoaders: [
		{loader: 'transform?brfs'}
	]
};
