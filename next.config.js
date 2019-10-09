// composer
const withPlugins = require('next-compose-plugins')

// plugins
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv();

// next config
const nextConfig = {
  env: {
    TENANT: process.env.TENANT,
  },
};

module.exports = withPlugins([
  [withCSS],
  [withImages],
  withNextEnv,
], nextConfig)
