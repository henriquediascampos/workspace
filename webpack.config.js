/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    target: 'electron-main',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './', // Configure o publicPath para './'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/', name: '[name].[ext]' },
                    },
                ],
            },
        ],
    },
    externals: {
        electron: 'require("electron")',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
        },
        fallback: {
            fs: false, // Não incluir polyfill para 'fs'
            path: require.resolve('path-browserify'), // Usar o polyfill para 'path'
        },
    },
    plugins: [new CleanWebpackPlugin()],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // Separa as dependências do 'node_modules'
                    name: 'vendors', // Nome do arquivo de bundle de terceiros
                    chunks: 'all',
                },
            },
        },
    },
};
