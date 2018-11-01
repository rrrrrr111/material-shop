const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const PATHS = {
    webpackDev: "build/webpack-dev",
};
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {

    context: path.join(__dirname, 'src'),
    entry: {
        app: "./index"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, PATHS.webpackDev),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: true
                    }
                }
                ]
            },
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /(node_modules)/,
                use: [(devMode ? 'style-loader' : MiniCssExtractPlugin.loader),
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                //resolve-url-loader may be chained before sass-loader if necessary
                use: [(devMode ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [(devMode ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx', '.json', '.scss', '.less', '.css'],
        unsafeCache: true,
        alias: {
            'react': path.resolve(__dirname, 'node_modules/react/cjs/react.development.js'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom/cjs/react-dom.development.js')
        }
    },
    performance: {},
    //devtool: 'eval',
    devtool: 'source-map',

    target: 'web',

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    stats: {
        colors: true,
        reasons: true,
        hash: true,
        version: true,
        timings: true,
        chunks: true,
        chunkModules: true,
        cached: true,
        cachedAssets: true
    },
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, PATHS.webpackDev),
        hot: true,
        inline: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        //comments: /@license/i,
                    },
                    ie8: false,
                    compress: {warnings: true, screw_ie8: false},
                    mangle: true,
                },
                sourceMap: true,
                cache: true,
                parallel: true,
                extractComments: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            title: "tools",
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'node_modules/react/cjs/react.development.js'),
                to: path.resolve(__dirname, PATHS.webpackDev, 'react.js')
            },
            {
                from: path.resolve(__dirname, 'node_modules/react-dom/cjs/react-dom.development.js'),
                to: path.resolve(__dirname, PATHS.webpackDev, 'react-dom.js')
            }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'process.env.PUBLIC_URL': '"/public"'
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};