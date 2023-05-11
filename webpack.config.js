const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    mode: process.env.NODE_ENV,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'client/index.html')  
    })],
    devServer: {
        proxy: {'/**': 'http://localhost:3000' },
        port: 8080,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'build'),
            publicPath: 'build',
        }
    },
    module: {
        rules:[{
            test:/\.js|\.jsx$/,
            exclude: /\.\/node_modules\//,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            },
          },
          { test: /\.(scss|css)$/,
            exclude: /\.\/node_modules\//,
            use: ['style-loader','css-loader','sass-loader']
        }]
    }
}