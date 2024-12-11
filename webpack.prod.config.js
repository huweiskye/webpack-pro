'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        index: './src/index.tsx',
        //test: './src/test.ts',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        clean: true
    },
    //mode: 'production',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            // {
            //     test: /\.(ts|.tsx)$/,
            //     use: [
            //             {
            //               loader: 'babel-loader',
            //             //   options: {
            //             //     presets: ['@babel/preset-env', '@babel/preset-react'], // 配置 Babel 的预设
            //             //   },
            //             },
            //             'ts-loader'
            //     ],
            //     exclude: /node_modules/,
            // },
            {
                test: /\.css$/,
                use: [
                    //'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'New York',
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body'
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Hello',
        //     template: path.resolve(__dirname, './public/hello.html'),
        //     inject: 'body',
        //     filename: 'world.html'
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
        
    ]
}