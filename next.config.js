const compose = require('next-compose')

const withCSS = require('@zeit/next-css')
const withImages = require('next-images')

const cssConfig = {/** css config here */}
const imagesConfig = {/** images config here */}

module.exports = compose([
  [withCSS, cssConfig],
  [withImages, imagesConfig],
  {
    webpack: (config) => {
      /**some special code */
      return config
    }
  }
])
