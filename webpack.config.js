var path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist",
    //publicPath: 'IPFF2/dist',
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require("sass"),
              indentedSyntax: true // optional
            }
            // Requires sass-loader@^8.0.0
          }
        ]
      }
    ]
  }
};
