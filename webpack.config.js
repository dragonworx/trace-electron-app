// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
  const environment = env && env.production ? 'production' : 'development';
  console.log('Building for ' + environment.toUpperCase());
  return [
    // main process ...
    {
      mode: environment,
      entry: './src/main/index.js',
      target: 'electron-main',
      devtool: 'source-map',
      output: {
        path: __dirname + '/dist',
        filename: 'main-process.js',
      },
      externals: {
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      },
    },
    // render process ...
    {
      mode: environment,
      entry: './src/render/index.tsx',
      target: 'electron-renderer',
      devtool: 'source-map',
      output: {
        path: __dirname + '/dist',
        filename: 'render-process.js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.ts(x?)$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: 'style-loader',
                // loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/render/index.html',
        }),
        // new MiniCssExtractPlugin(),
      ],
    },
  ];
};
