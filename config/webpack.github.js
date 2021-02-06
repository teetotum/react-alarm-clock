const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");
const root = path.resolve(__dirname, "..");
const dotenv = require("dotenv").config({
    path: path.resolve(root, ".env")
}).parsed;

module.exports = env => {
    return merge(common, {
        mode: "production",
        output:    { publicPath: `/${dotenv.REPO_NAME}/` },
        devServer: { publicPath: `/${dotenv.REPO_NAME}/` },
    });
}
