import lightningcss from 'postcss-lightningcss';

export default {
  plugins: [
    lightningcss({
      // Lightning CSS options
      minify: true,
      targets: {
        // Support browsers with at least 1% usage
        chrome: 88,
        firefox: 85,
        safari: 14,
        edge: 88,
      }
    }),
  ],
};