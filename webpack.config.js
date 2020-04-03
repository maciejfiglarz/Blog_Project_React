const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BrowserPlugin = require('webpack-browser-plugin');

module.exports = {
    entry: [
        'babel-polyfill', "./src/js/index.js"
    ],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, "./dist")
        
    },
    devServer: {
        inline: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../'),
        port: 3001
    },
    watch: true,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            },
            // {     test: /\.scss?$/,     exclude: [path.resolve(__dirname,
            // 'node_modules')],     use: ExtractTextPlugin.extract({         fallback:
            // 'style-loader',         use: ['css-loader', 'sass-loader']     }) }
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?limit=100000'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./css/main.css'),
        new HtmlWebpackPlugin({template: "./src/index.html", filename: "index.html"}),
        new CopyWebpackPlugin([
            // {
            //     from: 'src/data/post',
            //     to: 'data/post'
            // },
             {
                from: 'src/images',
                to: 'images'
            }
        ]),
        // new BrowserPlugin({     openOptions: {         app: [             'chrome',
        //       //'--incognito',             '--disable-web-security', // to enable
        // CORS             '--user-data-dir=' + path.resolve(chromeUserDataDir) // to
        // let Chrome create and store here developers plugins, settings, etc.         ]
        //     } })

    ]
}