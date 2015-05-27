var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.ts',
    dest: './dist',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        root:[path.join(__dirname, 'bower_components')],
        extensions:['', '.webpack.js', 'web.js', '.js', '.ts']
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}