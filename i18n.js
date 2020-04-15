// import NextI18Next from 'next-i18next'
const NextI18Next = require('next-i18next').default

const defaultLanguage = process.env.TENANT === 'lau' ? 'es-CL' : 'es'

const otherLanguages = process.env.TENANT === 'lau' ? ['es'] : ['es-CL']

const NextI18NextInstance = new NextI18Next({
  defaultLanguage,
  localePath: 'static/locales',
  otherLanguages,
  serverLanguageDetection: false,
})

// export default NextI18NextInstance

/* Optionally, export class methods as named exports */
// export const {
//   appWithTranslation,
//   withTranslation,
// } = NextI18NextInstance

module.exports = NextI18NextInstance
