// config for babel

const plugins = [];

// if it is not production add react refresh because it cannot go in production
if (process.env.SERVE) {
  plugins.push("react-refresh/babel");
}

// like webpack contents get exported out
module.exports = {
  // adding the babel preset
  presets: [
    "@babel/preset-env",
    // Runtime automatic with React 17+ allows not importing React
    // in files only using JSX (no state or React methods)
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: plugins,
};
