// @ts-check
if ( ! process.env.TENANT) {
  throw new Error("Tenant undefined")
}

/**
 * @constant
 * @type {string}
 * @returns {string} "dalecampeon", "dalecacique" etc.
 */
export const TENANT = process.env.TENANT

export const STATIC_PATH = `/static/${TENANT}`
export const GRAY3 = '#333'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const ONLINE = IS_PRODUCTION
export const CLIENT_SECRET = 'ZVGpRrfYzEnW32jWrBi15hORec2DzXEhJsgmUmgX'
export const CLIENT_ID = 2
export const API_URL = IS_PRODUCTION ? 'http://dale.sa-east-1.elasticbeanstalk.com' : process.env.API_URL || 'http://127.0.0.1:8000'
