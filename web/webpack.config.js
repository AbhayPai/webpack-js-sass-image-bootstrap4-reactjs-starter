const Path = require("path");
const CssNano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let PathsToClean = [
    './public/*',
];

let CleanOptions = {
    exclude:  [
        './private/*',
        './node_modules/*'
    ],
    verbose:  true,
};

module.exports = {
    entry: {
        index: Path.join(__dirname, "./", "private/", "js/", "index.js"),
        vendor: Path.join(__dirname, "./", "private/", "js/", "vendor.js")
    },

    output: {
        filename: "[name].js",
        path: Path.join(__dirname, "./", "public/", "js/")
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader"
                }
            ]
        }, {
            test: /\.(jpe?g|png|gif|ico)$/i,
            loader: "file-loader"
        }, {
            test: /\.woff|woff2|eot|ttf|svg$/,
            use: {
                loader: "url-loader",
            }
        }]
    },

    plugins: [
        new CleanWebpackPlugin(
        PathsToClean,
        CleanOptions
        ),

        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
            }
        }),

        new MiniCssExtractPlugin({
            filename: "./../css/[name].css"
        }),

        new CopyWebpackPlugin([
            {
                to: Path.join(__dirname, "./", "public/", "images/"),
                from: Path.join(__dirname, "./", "private/", "images/")
            }
        ]),

        new OptimizeCssAssetsPlugin({
            cssProcessor: CssNano,
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]
};
