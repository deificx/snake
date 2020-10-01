const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: resolve(__dirname, "src", "game.js"),
  output: {
    filename: "snake.js",
    path: resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader?{fix:true}",
        enforce: "pre",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ title: "Snake" })],
};
