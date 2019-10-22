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
export const ONLINE = process.env.NODE_ENV === 'production'
