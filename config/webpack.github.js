const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env) => {
    return merge(common, {
        mode: "production",
        // @Todo: Grab the project name from package.json.
        output:    { publicPath: "/react-alarm-clock/" },
        devServer: { publicPath: "/react-alarm-clock/" },
    });
}
