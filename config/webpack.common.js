const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

const root = path.resolve(__dirname, "..");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
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
                use: ["style-loader", "css-loader", "sass-loader"]
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                "!index.html",
                "!.git"
            ]
        })
    ],
    resolve: {
        alias: {
            "@components": path.resolve(root, "src/components"),
            "@assets":     path.resolve(root, "src/assets"),
            "@hooks":      path.resolve(root, "src/hooks")
        },
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    devServer: {
        contentBase: path.join(root, "dist"),
        hot: true
    }
};
