const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = merge(common, {
//     mode: "production",
//     output: {
//         filename: "[name].[contenthash].bundle.js",
//         path: path.resolve(__dirname, "dist")
//     },
//     optimization: {
//         minimizer: [
//             // new OptimizeCssAssetsPlugin(),
//             // new TerserPlugin(),
//             new HtmlWebpackPlugin({
//                 template: "./src/template.html",
//                 minify: {
//                     removeAttributeQuotes: true,
//                     collapseWhitespace: true,
//                     removeComments: true
//                 }
//             })
//         ]
//     },
//     plugins: [
//         // new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
//         // new CleanWebpackPlugin()
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     // MiniCssExtractPlugin.loader, //3. Extract css into files
//                     "style-loader",
//                     "css-loader", //2. Turns css into commonjs
//                 ]
//             }
//         ]
//     }
// });

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                ]
            }
        ]
    }
});