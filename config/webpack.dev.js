const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

const root = path.resolve(__dirname, "..");

module.exports = (env) => {
    return merge(common, {
        mode: "development",
        output:    { publicPath: "/" },
        devServer: { publicPath: "/" },
        devtool: "inline-source-map",
    });
}
