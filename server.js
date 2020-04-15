/*
 * File based at Custom server and routing of Next.js docs:
 * https://nextjs.org/docs#custom-server-and-routing
 * https://github.com/zeit/next.js/tree/canary/examples/custom-server-express
 */

// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel

const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
dotenv.config()
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

const { parse } = require('url')
const port = parseInt(process.env.PORT, 10) || 3000

/* const yargs = require('yargs')
const hostnames = ['dalecampeon', 'dalecacique']
const hostnameList = hostnames.join(' or ')
const argv = yargs
  .option('hostname', {
    description: `Define the hostname (${hostnameList})`,
    alias: 'H',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv

if ( ! argv.hostname) {
  throw new Error("Hostname undefined, please provide a --hostname or -H value")
}

if ( ! hostnames.includes(argv.hostname)) {
  throw new Error(`Hostname invalid, must be ${hostnameList}`)
} */

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleNextRequests = app.getRequestHandler()

/* For some reason, async/await weren't working to me */
// (async () => {
//   await app.prepare()
app.prepare().then(() => {
  const server = express()

  // await nextI18next.initPromise
  nextI18next.initPromise.then(() => {

    server.use(nextI18NextMiddleware(nextI18next))

    /* if (argv.hostname === 'dalecampeon' ||
      ['dalecampeon.com', 'dalecampeon.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname

    } else if (argv.hostname === 'dalecacique' ||
      ['dalecacique.com', 'dalecacique.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname
    } */

    server.get('/login', (req, res) => {
      req.query.modal = 'login'
      return app.render(req, res, '/', req.query)
    })

    server.get('/gLogin', (req, res) => {
      req.query.modal = 'login'
      req.query.socialProvider = 'google'
      return app.render(req, res, '/', req.query)
    })

    server.get('/fLogin', (req, res) => {
      req.query.modal = 'login'
      req.query.socialProvider = 'facebook'
      return app.render(req, res, '/', req.query)
    })

    server.get('/register', (req, res) => {
      req.query.modal = 'register'
      return app.render(req, res, '/', req.query)
    })

    server.get('/password/reset', (req, res) => {
      req.query.modal = 'password'
      return app.render(req, res, '/', req.query)
    })

    server.all('*', (req, res) => {
      return handleNextRequests(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})
// })()
