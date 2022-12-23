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
        verbose: true
      }
    },
    {
      resolve: `gatsby-plugin-output`,
      options: {
        // default values
        publicPath: 'public',
        rmPublicFolder: false
      }
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@public": "public",
          "@images": "src/images",
          "@styles": "src/styles",
        },
        extensions: [
          "js",
        ],
      }
    },
    `gatsby-plugin-prettier-build`,
    `gatsby-plugin-output`,
    `gatsby-plugin-alias-imports`

  ],
}
