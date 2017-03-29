/**
 * Created by Elliott on 2017/3/29.
 */
var webpack = require('webpack');

module.exports = {
    devtool:'source-map',
    entry: [__dirname + '/app/main.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.styl$/,
                loader: "style-loader!css-loader!stylus-loader"
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};