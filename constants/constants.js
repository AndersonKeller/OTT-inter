// @ts-check
if ( ! process.env.TENANT) {
  throw new Error("Tenant undefined")
}

/**
 * @constant
 * @type {boolean}
 * @returns {boolean}
 */
export const IS_BROWSER = typeof window !== 'undefined'

/**
 * @constant
 * @type {boolean}
 * @returns {boolean}
 */
export const HAS_WINDOW = IS_BROWSER

/**
 * @constant
 * @type {string}
 * @returns {string} "river", "dalecacique" etc.
 */
export const TENANT = process.env.TENANT

export const STATIC_PATH = `/static/${TENANT}`
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const ONLINE = IS_PRODUCTION
export const CLIENT_SECRET = 'IxY0z1pn27XwHNeFD5mj34ok34uqbEa5cehhQza4'
export const CLIENT_ID = 2

const LOCAL_API_URL = process.env.API_URL || 'http://127.0.0.1:8000'

export const API_URL = IS_PRODUCTION ? 'https://admin.rivermas.com' : LOCAL_API_URL

/**
 * @constant
 * @type {string}
 * @returns {string} "https" or "http".
 */
export const HTTP_PROTOCOL = IS_PRODUCTION ? 'https' : 'http'
