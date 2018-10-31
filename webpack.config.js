const path = require('path');
const PATHS = {
    app: "./js/App",
    build: path.join(__dirname, 'build')
};
module.exports = {
    devtool: 'source-map',
    entry: {
        app: PATHS.app
    },
    module: {
        loaders: [
            {
                test: /\.js$/,                  // загрузка кода JSX и преобразование в JS 2015
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};