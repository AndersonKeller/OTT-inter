const path = require('path');

// composer
const withPlugins = require('next-compose-plugins')

// plugins
require('dotenv').config()
require('dotenv-load')()
const withImages = require('next-images')
const withSourceMaps = require('@zeit/next-source-maps')()
const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')

// next config
const nextConfig = withSourceMaps({
  env: {
    TENANT: process.env.TENANT,
    API_URL: process.env.API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signup',
        permanent: true,
      },
      {
        source: '',
        destination: '/signup',
        permanent: true,
      },
    ]
  },
  webpack(config, options) {
    config.resolve.alias['~'] = path.resolve(__dirname)

    // Runs @sentry/browser when building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    return config
  },
})

module.exports = withPlugins([
  [withImages, withSass]
], nextConfig)
