const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

const root = path.resolve(__dirname, "..");

module.exports = {
    entry: path.resolve(root, "src", "index.tsx"),
    output: {
        filename: "[name].[fullhash].js",
        path: path.resolve(root, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    // @Todo: mini-css-extract-plugin is more often used in production mode
                    // to get separate css files. For development mode
                    // (including webpack-dev-server) you can use style-loader, because it
                    // injects CSS into the DOM using multiple and works faster.
                    //
                    // Do something like this instead:
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, "postcss.config.js")
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!.git"] // @Note: Only do this in gh-pages build?
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(root, "src", "index.ejs"),
            inject: false
        })
    ],
    resolve: {
        alias: {
            "@components": path.resolve(root, "src", "components"),
            "@assets":     path.resolve(root, "src", "assets"),
            "@hooks":      path.resolve(root, "src", "hooks"),
            "@common":     path.resolve(root, "src", "common")
        },
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    devServer: {
        contentBase: path.join(root, "dist"),
        hot: true
    }
};
