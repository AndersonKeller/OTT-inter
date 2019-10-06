
const next = require('next')
const http = require('http')

const dev = process.env.NODE_ENV !== 'production'

if (dev && ! process.argv[2]) {
  throw new Error("Shouldn't run dev with no --riverplate or --colocolo flag")
}

const app = next({ dev })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = new http.Server((req, res) => {
    // app.setAssetPrefix('')
    if (['dalecampeon.com'].includes(req.headers.host) || process.argv[2] === '--riverplate') {
      process.env.TENANT = 'riverplate'
    } else if (['dalecacique.com'].includes(req.headers.host) || process.argv[2] === '--colocolo') {
      process.env.TENANT = 'colocolo'
    } else {
      throw new Error("Tenant unknown")
    }

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
