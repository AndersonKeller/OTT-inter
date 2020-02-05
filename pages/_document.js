import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { IS_PRODUCTION } from '~/constants/constants'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, shrink-to-fit=no, width=device-width" />
          {/* styles */}
          { IS_PRODUCTION ? <>
            {/* bootstrap */}
            <link
              crossOrigin="anonymous"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              rel="stylesheet"
              />
            {/* slick */}
            <link
              charSet="utf-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* slick theme */}
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* roboto & roboto condensed */}
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Condensed:700&amp;display=swap"
              rel="stylesheet"
            />
          </> : <>
            {/* slick theme */}
            <link rel="stylesheet" href="/static/slick-theme.css" />
            {/* roboto & roboto condensed */}
            <link rel="stylesheet" href="/static/fonts/roboto/stylesheet.css" />
          </> }
          {/* bebas */}
          <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
