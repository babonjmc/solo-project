const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './client/index.js'),
    mode: process.env.Node_ENV,
    output: {
        filename: 'bundle.js',
        publicPath: '/build',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html')  
    })],
    devServer: {
        proxy: {'/**': 'http://localhost:3000' },
        historyApiFallback: true,
        static: {
            directory:path.resolve(__dirname, '/')
        }
    },
    module: {
        rules:[{
            test:/\.js|\.jsx$/,
            exclude: /\.\/node_modules\//,
            use: {
                loader: 'babel-loader',
                options: {
                    presets:[    
                      ['@babel/env', { targets: "defaults" }],
                      ['@babel/react', { targets: "defaults" }],]
                }
            },
          },
          { test: /\.(scss|css)$/,
            exclude: /\.\/node_modules\//,
            use: ['style-loader','css-loader','sass-loader']
        }]
    }
}