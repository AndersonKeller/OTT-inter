// colors
const GRAY3 = '#333'

const ONLINE = process.env.NODE_ENV === 'production'

if ( ! process.env.NEXT_PUBLIC_TENANT) {
  throw new Error("Tenant undefined")
}

const STATIC_SUFFIX = process.env.NEXT_PUBLIC_TENANT

export { GRAY3, ONLINE, STATIC_SUFFIX }
