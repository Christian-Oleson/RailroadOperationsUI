const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (webpackConfigEnv: any, argv: any) => {
  const orgName = "CO";
  const projectName = "root";
  const filename = `${orgName}-${projectName}`;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    entry: {
      [filename]: path.resolve(process.cwd(), `src/${filename}`),
    },

    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ModuleFederationPlugin({
        name: "railroad",
        filename: `CO-root.js`,
        remotes: {
          "@CO/api": "@CO/api@http://localhost:8080/CO-api.js",
          "@CO/railroad-ops":
            "railroad-ops@http://localhost:5003/CO-railroad-ops.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: ">=17.0.2",
          },
          "react-dom": {
            singleton: true,
            requiredVersion: ">=17.0.2",
          },
          "react-query": {
            requiredVersion: "^3.33.1",
          },
          "@CO/api": {
            singleton: true,
          },
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve("babel-loader", { paths: [__dirname] }),
          },
        },
        {
          test: /\.(bmp|png|svg|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          type: "asset/resource",
        },
        {
          test: /\.html$/i,
          exclude: [/node_modules/, /\.vue\.html$/],
          type: "asset/source",
        },
        {
          test: /\.css$/,
          include: [/static/],
          use: [
            {
              loader: require.resolve("style-loader", { paths: [__dirname] }),
            },
            {
              loader: require.resolve("css-loader", { paths: [__dirname] }),
              options: {
                modules: false,
              },
            },
          ],
        },
      ],
    },
  });
};
