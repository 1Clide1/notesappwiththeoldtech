// imports
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
// usually target is defaulted to web but can also be node etc setting to web just incase
let target = "web";

// webpack plugins
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    // my index html file is in the public folder
    template: "./public/index.html",
  }),
];

//  if webpack is in production build
if (process.env.NODE_ENV === "production") {
  mode = "production";
  // not sure if the browserslist is actually bugged still but if it ain't broke I will not change this
  target = "browserslist";
}

// only want React Hot Reloading in serve mode
if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

// webpack code wrapped to be exported
module.exports = {
  //setting the mode to a variable that way I can switch between dev and production
  mode: mode,

  // entry point of my app
  entry: "./src/index.js",
  //   setting the ouput of the webpack
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
  },
  //   all of the modules have rules and this is how to add said rules
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          //   sass needs to be at the bottom to avoid any post css errors
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      //   module rules for bable
      {
        test: /\.(js|jsx)$/,
        // this is supposed to be regex
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // needs to be inside use
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: plugins,
  target: target,
  //   possible js extensions
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    // contentbase is dead now use static instead
    static: "./build",
    hot: true,
    port: 3001, // default 8000
  },
};
