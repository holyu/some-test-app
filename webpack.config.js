// webpack 4

const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const productionMode =
  process.env.NODE_ENV == "production" || process.env.NODE_ENV == "source_map";
const sourceMap = process.env.NODE_ENV == "source_map";

module.exports = {
  mode: productionMode ? "production" : "development",
  entry: { main: "./src/app.js" },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  optimization: {
    minimizer:
      productionMode && !sourceMap
        ? [
            new OptimizeCSSAssetsPlugin({
              cssProcessorOptions: { discardComments: { removeAll: true } },
              canPrint: true
            })
          ]
        : []
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader"
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          productionMode ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: {}
            }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/index.html",
      filename: "index.html",
      minify: productionMode
        ? {
            collapseWhitespace: true,
            preserveLineBreaks: false,
            removeComments: true,
            caseSensitive: true
          }
        : false
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new UglifyJSPlugin({
      test: productionMode ? /\.js$/i : /$a/,
      sourceMap: true
    }),
    new CleanWebpackPlugin("dist", { dry: productionMode ? false : true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": productionMode
        ? JSON.stringify("production")
        : undefined
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: productionMode ? /\.js$|\.css$|\.html$/ : /$a/,
      minRatio: 0.8
    }),new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /pl/
    ),
    // new BundleAnalyzerPlugin()
  ],
  
  devtool: productionMode
    ? sourceMap
      ? "source-map"
      : "none"
    : "cheap-module-eval-source-map",
  devServer: productionMode
    ? {}
    : {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true
      }
};
