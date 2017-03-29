/**
 * Created by Elliott on 2017/3/16.
 */
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: ['webpack/hot/dev-server', __dirname + '/app/main.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(css)$/,
            use: ["style-loader", "css-loader"]
        },{
            test: /\.styl$/,
            use:["style-loader","css-loader","stylus-loader"]
        }]

    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.BannerPlugin("Copyright Ren Guowen."),
    ],
    //webpack-dev-server配置
    devServer: {
        contentBase: './build',

        historyApiFallback: true,
        inline: true,
        port: 8080,

    }
};