const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env) => {
    return merge(common, {
        mode: "production",
        output:    { publicPath: "/" },
        devServer: { publicPath: "/" },
    });
}
