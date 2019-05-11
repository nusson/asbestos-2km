import { without, merge } from 'lodash';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';
import WebpackHelper from './_helper';
/**
 * @returns generic loaders (cause it's a big list...)
 * @param {Object} options - see code for list of options
 * @param {Boolean} options.stylus - if true add stylus-loader
 * @param {Boolean|String} options.extract - [true:force extract, false:no extract if dev]
 */
export default function (opts = {}) {
  const options = merge({
    stylus: null,
    extract: WebpackHelper.ENV.IS_DEV,
    optimize: !WebpackHelper.ENV.IS_DEV,
    includeCSSPaths: [
      // `${WebpackHelper.DIRS.NODE_MODULES}swiper/dist/css/`,
    ], // you can add some vendors path to be able to require them
  }, opts);

  const MiniCssExtractPlugin = (() => {
    if (!options.extract) return null;
    return require('mini-css-extract-plugin'); // eslint-disable-line global-require
  })();

  const miniExtractLoader = (() => {
    if (!options.extract) return null;
    return {
      loader: MiniCssExtractPlugin.loader,
      options: {
        filename: '[name].css',
        // you can specify a publicPath here
        // by default it uses publicPath in webpackOptions.output
        // publicPath: '../',
        hmr: WebpackHelper.ENV.IS_DEV,
      },
    };
  })();
  /**
   * all loaders used for css / stylus etc
   */
  const cssLoaders = without([
    'css-hot-loader',

    options.extract ? miniExtractLoader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')(), // eslint-disable-line global-require
        ],
      },
    },
  ], null);


  const rules = without([
    // css
    {
      test: /\.css$/,
      use: cssLoaders,
      include: [
        WebpackHelper.DIRS.SRC,
        ...options.includeCSSPaths,
      ],
    },
    // stylus
    (({ stylus }) => {
      if (!stylus) return null;
      return {
        test: /\.(styl|stylus)$/,
        use: [
          ...cssLoaders,
          'stylus-loader',
        ],
        include: WebpackHelper.DIRS.SRC,
      };
    })(options),
  ], null);


  const plugins = without([
    (({ optimize }) => {
      if (!optimize) return null;
      return new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
          // Run cssnano in safe mode to avoid potentially unsafe transformations.
          safe: true,
        },
        canPrint: false,
      });
    })(options),

    (({ extract }) => {
      if (!extract) return null;
      return new MiniCssExtractPlugin({
        filename: `assets/css/[name]${WebpackHelper.HASH}.css`,
        chunkFilename: `assets/css/[id]${WebpackHelper.HASH}.css`,
      });
    })(options),

    /** inject libs/settings within our stylus
     * @params {Array} imports - files to import
     */
    (({ stylus }) => {
      if (!stylus) return null;
      const { LoaderOptionsPlugin } = require('webpack'); // eslint-disable-line global-require
      return new LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [ // inject our settings stylus + libs
              `${WebpackHelper.DIRS.NODE_MODULES}@koddein/stylus/lib/vars/index`,
              `${WebpackHelper.DIRS.ASSETS}styles/settings/index`,
              `${WebpackHelper.DIRS.NODE_MODULES}@koddein/stylus/index`,
            ],
            use: [
              require('rupture')(), // eslint-disable-line global-require
              require('kouto-swiss')(), // eslint-disable-line global-require
            ],
            preferPathResolver: 'webpack',
          },
        },
      });
    })(options),
  ], null);

  // return webpack config
  return {
    module: { rules },
    plugins,
  };
}
