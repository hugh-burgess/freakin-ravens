const path = require('path')
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Game`,
    siteUrl: `https://www.yourdomain.tld`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-prettier-build`,
      options: {
        // default values
        types: ['html'],
        concurrency: 20,
        verbose: true,
      },
    },
    {
      resolve: `gatsby-plugin-output`,
      options: {
        // default values
        publicPath: 'public',
        rmPublicFolder: false,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@static': path.resolve(__dirname, 'static'),
          '@styles': path.resolve(__dirname, 'static/styles'),
          '@system': path.resolve(__dirname, 'src/system'),
          '@images': path.resolve(__dirname, 'static/images'),
          '@animations': path.resolve(__dirname, 'src/system/animations'),
        },
       extensions: ['js', 'css', 'json'],
      },
    },
    `gatsby-plugin-prettier-build`,
    `gatsby-plugin-output`,
    `gatsby-plugin-alias-imports`,
  ],
}
