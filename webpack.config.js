const path = require("path");

const TerserPlugin           = require("terser-webpack-plugin");
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const HtmlWebpackPlugin      = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootDir   = __dirname;
const distDir   = path.resolve(rootDir, "dist");
const srcDir    = path.resolve(rootDir, "src");
const assetsDir = path.resolve(srcDir, "assets");
const outputDir = distDir;

const dotenv = require("dotenv").config({
    path: path.resolve(rootDir, ".env")
}).parsed;

const entryFilename    = "index.tsx";
const templateFilename = "index.hbs";
const faviconFilename  = "favicon.ico";

module.exports = env => {
    const mode = (env.mode === "development") ? "development" : "production"
    const publicPath  = (env.mode === "github") ? `/${dotenv.REPO_NAME}/` : "/";

    const plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!.git"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, templateFilename),
            favicon:  path.resolve(assetsDir, "images", faviconFilename),
            inject: false
        })
    ];

    if (mode !== "development") {
        const miniCssExtractPlugin = new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
        });
        plugins.unshift(miniCssExtractPlugin);
    }

    const result = {
        mode: mode,
        entry: path.resolve(srcDir, entryFilename),
        output: {
            filename: "[name].[fullhash].js",
            path: outputDir,
            publicPath: publicPath
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
                        // mini-css-extract-plugin is more often used in production mode
                        // to get separate css files. For development mode
                        // (including webpack-dev-server) you can use style-loader, because it
                        // injects CSS into the DOM using multiple <style> tags and works faster.
                        mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
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
                },
                {
                    test: /\.hbs$/,
                    "loader": "handlebars-loader"
                }
            ]
        },
        plugins: plugins,
        resolve: {
            alias: {
                "@src":        srcDir,
                "@components": path.resolve(srcDir, "components"),
                "@hooks":      path.resolve(srcDir, "hooks"),
                "@assets":     assetsDir,
            },
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
        },
        devServer: {
            contentBase: distDir,
            hot: true
        },
        devtool: mode === "development" ? "inline-source-map" : false,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: { drop_console: true, }
                    }
                })
            ]
        }
    };

    return result;
};
