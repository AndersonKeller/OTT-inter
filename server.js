/*
 * File based at Custom server and routing of Next.js docs:
 * https://nextjs.org/docs#custom-server-and-routing
 */

// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const next = require('next')
const { createServer } = require('http')
const { parse } = require('url')
const port = 3000

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

app.prepare().then(() => {
  createServer((req, res) => {
    /* if (argv.hostname === 'dalecampeon' ||
      ['dalecampeon.com', 'dalecampeon.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname

    } else if (argv.hostname === 'dalecacique' ||
      ['dalecacique.com', 'dalecacique.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname
    } */

    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/login') {
      query.modal = 'login'
      app.render(req, res, '/', query)
    } else if (pathname === '/register') {
      query.modal = 'register'
      app.render(req, res, '/', query)
    } else if (pathname === '/password/reset') {
      query.modal = 'password'
      app.render(req, res, '/', query)
    } else {
      handleNextRequests(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
