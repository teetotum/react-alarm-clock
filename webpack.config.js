const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
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
                type: 'asset/resource'
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@assets":     path.resolve(__dirname, "src/assets"),
            "@hooks":      path.resolve(__dirname, "src/hooks")
        },
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    devServer: {
        publicPath: "/",
        contentBase: path.join(__dirname, "dist"),
        hot: true
    },
    devtool: "eval-source-map"
}
