/**
 * Created by oxchain on 2017/9/19.
 */
const path = require('path');
const webpack = require('webpack');

let prod = process.env.NODE_ENV === 'production';

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: prod ? "https://statinc.oxchains.com/themis-www/" : "",
        filename: 'bundle.[chunkhash:8].js'
    },
    module: {
        loaders : [{
            test : /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url-loader?limit=8192&name=public/[hash:8].[name].[ext]',
                options: {
                    publicPath: "/"
                }
            }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names : "",
            minChunks:Infinity
        })
    ],
    resolve: {
        extensions: ['.js','.jsx','.css']
    }
}