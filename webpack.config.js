const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/Example",
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      // [name] should match the root folder name
      name: "vsch_Demo", 
      filename: "remoteEntry.js",
      // [exposes] list of entrypoints to build and export
      // eventually you can export multiple components and create a library
      // for now it is only possible to declare one "entry" in package.json
      exposes: {
        "Example": "./src/Example",
      },
      // [shared] tells VSC-Home what dependencies this widget needs and offers
      // * React and ReactDOM are used from VSC-Home
      // * momentjs is added in this example, so when other widgets
      // also need momentjs, they will share the dependency with this component
      // to minimize the number of double dependencies to load
      shared: {
        moment: deps.moment,
        react: {
          requiredVersion: deps.react,
          import: "react",
          shareKey: "react",
          shareScope: "default",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
        },
      },
    })
  ],
};
