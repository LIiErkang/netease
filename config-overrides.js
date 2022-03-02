const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
	addWebpackAlias({
		'@': path.resolve(__dirname, './src'),
		'@pages': path.resolve(__dirname, './src/pages'),
		'@components': path.resolve(__dirname, './src/components'),
		'@api': path.resolve(__dirname, './src/api'),
		'@utils': path.resolve(__dirname, './src/utils'),
		'@redux': path.resolve(__dirname, './src/redux'),
		'@styles': path.resolve(__dirname, './src/styles'),
		'@routes': path.resolve(__dirname, './src/routes')
	})
)
