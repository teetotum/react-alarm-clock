const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = env => {
    return merge(common, {
        mode: "development",
        output:    { publicPath: "/" },
        devServer: { publicPath: "/" },
        devtool: "inline-source-map",
    });
}
