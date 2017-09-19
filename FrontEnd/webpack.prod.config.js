/**
 * Created by oxchain on 2017/9/19.
 */
const path = require('path');
const common = require('./webpack.base.config.js');
const Merge = require('webpack-merge');
const webpack=require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Merge(common,{
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            publicPath: './',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([{
            from: './public/css',
            to: 'public/css',
        },{
            from: './public/img',
            to: 'public/img',
        }
        ]),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })
    ],
    devtool: 'source-map',//调试模式
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    }
});
