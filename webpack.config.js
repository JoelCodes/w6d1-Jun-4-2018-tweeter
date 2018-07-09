module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public/dist`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
};
