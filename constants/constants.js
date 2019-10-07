// colors
const GRAY3 = '#333'

const ONLINE = process.env.NODE_ENV === 'production'

if ( ! process.env.TENANT) {
  throw new Error("Tenant undefined")
}

const STATIC_SUFFIX = process.env.TENANT

export { GRAY3, ONLINE, STATIC_SUFFIX }
