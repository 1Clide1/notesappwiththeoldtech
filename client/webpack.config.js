const path = require("path");
module.exports = {
  // starting with the entry point of my react app
  entry: "./src/index.js",
  //   setting the ouput of the webpack
  ouput: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
    publicPath: "/client",
  },
  //setting the mode to develop and adding it to production in the build
  mode: "development",

  devServer: {
    contentBase: "/build",
  },
};
