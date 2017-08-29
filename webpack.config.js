const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'app.js',
        path:path.resolve(__dirname,'src')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hot'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    }
}