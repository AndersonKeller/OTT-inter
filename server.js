const next = require('next')
const http = require('http')
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
  const server = new http.Server((req, res) => {
    // app.setAssetPrefix('')

    /* if (argv.hostname === 'dalecampeon' ||
      ['dalecampeon.com', 'dalecampeon.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname

    } else if (argv.hostname === 'dalecacique' ||
      ['dalecacique.com', 'dalecacique.now.sh'].includes(req.headers.host)) {
      process.env.TENANT = argv.hostname
    } */

    handleNextRequests(req, res)
  })
  const port = 3000

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})
