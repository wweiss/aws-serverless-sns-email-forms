"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const path = require("path");
const webpackTask = require('@codification/cutwater-build-webpack').webpack;
const isProduction = webpackTask.buildConfig.production;
const webpackConfiguration = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        'sns-email-forms': path.join(__dirname, webpackTask.buildConfig.libFolder, 'lambda', 'EmailFormHandler.js')
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, webpackTask.buildConfig.distFolder),
        filename: `[name].js`,
    },
    externals: ['aws-sdk'],
    target: 'node'
};
module.exports = webpackConfiguration;