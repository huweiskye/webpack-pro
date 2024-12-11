'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default

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
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.less']
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
                    //'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                    })
                                    //require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 16,
                            remPrecision: 8
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //       postcssOptions: {
                    //         plugins: [
                    //           ['autoprefixer'],
                    //         ],
                    //       },
                    //     },
                    // },
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
        new HtmlInlineCssWebpackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
        
    ],
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 200,
    //     poll: 1000,
    //     ignored: /node_modules/,
    // },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 20000,
    //         minRemainingSize: 0,
    //         minchunks: 1,
    //         cacheGroup: {
    //             default: {
    //                 minChunks: 2, 
    //                 priority: -20,
    //                 reuseExistingChunk: true,
    //             },
    //             defaultVendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10,
    //                 reuseExistingChunk: true,
    //             }
    //         }

    //     }
    // },
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons:  {
                    name: 'hello',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
     
    devServer: {
        host: 'localhost',
        port: '8888',
        open: true,
        hot: true,
        client: {
            logging: 'error',
            overlay: true,
            progress: true,
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /abc/, to: "world.html"
                }
            ]
        },
        //lazy: true,
        //devtool: 'eval'
    }
}