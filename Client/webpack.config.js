const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src') + '/index.js',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3000,
        publicPath: 'http://localhost:3000/',
        hotOnly: true
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js', 'jsx']
                },
                test: /\.js$|jsx/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new Dotenv()
    ]
};