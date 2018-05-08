
require("dotenv").config({ path: ".env.development" });
const merge = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {});