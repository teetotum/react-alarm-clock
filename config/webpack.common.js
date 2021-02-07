const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require("path");
const root_dir   = path.resolve(__dirname, "..");
const dist_dir   = path.resolve(root_dir, "dist");
const src_dir    = path.resolve(root_dir, "src");
const assets_dir = path.resolve(src_dir, "assets");

const output_dir = dist_dir;
const publicPath = "/";

const entry_filename = "index.tsx";
const entry = path.resolve(src_dir, entry_filename);

const template_filename = "index.ejs";
const template = path.resolve(src_dir, template_filename);

const js_bundle_filename  = "[name].[fullhash].js";
const css_bundle_filename = "[name].[fullhash].css";

const favicon_filename = "favicon.ico";
const favicon = path.resolve(assets_dir, "images", favicon_filename);

const aliases = {
    "@components": path.resolve(src_dir, "components"),
    "@hooks":      path.resolve(src_dir, "hooks"),
    "@common":     path.resolve(src_dir, "common"),
    "@assets":     assets_dir
};

const extensions = [".js", ".jsx", ".json", ".ts", ".tsx"];

const rules = [
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
            // injects CSS into the DOM using multiple <style> tags and works faster.
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
];

const plugins = [
    new MiniCssExtractPlugin({
        filename: css_bundle_filename
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!.git"] // @Note: Only do this in gh-pages build?
    }),
    new HtmlWebpackPlugin({
        template: template,
        favicon: favicon,
        inject: false
    })
];

module.exports = {
    entry: entry,
    output: {
        filename: js_bundle_filename,
        path: output_dir,
        publicPath: publicPath
    },
    module: {
        rules: rules
    },
    plugins: plugins,
    resolve: {
        alias: aliases,
        extensions: extensions
    },
    devServer: {
        contentBase: dist_dir,
        hot: true
    }
};
