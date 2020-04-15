module.exports = {
  allLanguages: ['es', 'es-CL'],
  defaultLanguage: process.env.TENANT === 'lau' ? 'es-CL' : 'es',
  redirectToDefaultLang: false,
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
  pages: {
    '*': ['common'],
  },
}
