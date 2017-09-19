/**
 * Created by oxchain on 2017/9/19.
 */
const path = require('path');
const common = require('./webpack.base.config.js');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Merge(common, {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React App',
            template: 'index.ejs',
            publicPath: './',

        }),
        new CopyWebpackPlugin([{
            from: './public',
            to: 'public'
        }])
    ],
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    }
});
