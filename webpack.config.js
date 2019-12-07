"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); const webpackTask = require('@codification/cutwater-build-webpack').webpack;
const isProduction = webpackTask.buildConfig.production;
const webpackConfiguration = {
    mode: isProduction ? 'production' : 'development',
    context: __dirname,
    devtool: (isProduction) ? undefined : 'source-map',
    entry: {
        'sns-email-forms': path.join(__dirname, webpackTask.buildConfig.libFolder, 'lambda', 'EmailFormHandler.js')
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, webpackTask.buildConfig.distFolder),
        filename: `[name].js`,
        globalObject: 'this',
    },
    devServer: {
        stats: 'none'
    },
    externals: {
        'aws-sdk': {
            amd: 'aws-sdk',
            commonjs: 'aws-sdk',
            commonjs2: 'aws-sdk'
        }
    },
    optimization: {
        minimizer: [],
    },
    target: 'node'
};
if (isProduction && webpackConfiguration.optimization && webpackConfiguration.optimization.minimizer) {
    webpackConfiguration.optimization.minimizer.push(
        new TerserPlugin({
            parallel: true,
            sourceMap: true,
            include: /\.min\.js$/,
            terserOptions: {
                ecma: 6,
            },
        }),
    );
}
module.exports = webpackConfiguration;