if ( ! process.env.APP_NAME) {
  throw new Error("App name undefined")
}
const APP_NAME = process.env.APP_NAME

if ( ! process.env.TENANT) {
  throw new Error("Tenant undefined")
}
const STATIC_SUFFIX = process.env.TENANT

const GRAY3 = '#333'

const ONLINE = process.env.NODE_ENV === 'production'

export { APP_NAME, GRAY3, ONLINE, STATIC_SUFFIX }
