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
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const ONLINE = IS_PRODUCTION
export const CLIENT_SECRET = 'IxY0z1pn27XwHNeFD5mj34ok34uqbEa5cehhQza4teste'
export const CLIENT_ID = 2

const LOCAL_API_URL = process.env.API_URL || 'http://127.0.0.1:8000'

export const API_URL = IS_PRODUCTION ? 'https://admin.dalecampeon.net' : LOCAL_API_URL
